<script setup lang="ts">
import { watch, ref } from 'vue'
import { defineAsyncComponent } from 'vue'
import PlayerLoading from './screens/player-loading.vue'
import PlayerComponentX from './screens/player.vue'

/**
 * Prop default values should match `index.ts`
 */
const props = withDefaults(defineProps<{
  apiToken: string
  streamName?: string
  allowControls?: boolean
  defaultVolume?: number // 0-100

  showHeader?: boolean
}>(), {
  streamName: 'Directus',
  allowControls: true,
  defaultVolume: 50,

  showHeader: false,
})

let spotifyPlayer = ref()
const sdkInsertElement = ref()

function importSpotifySDK(bindElement: HTMLElement): void {
  const alreadyImported = document.getElementById('spotify-script')
  if (!alreadyImported) {
    var scriptTag = document.createElement("script")
    scriptTag.src = "https://sdk.scdn.co/spotify-player.js"
    scriptTag.id = "spotify-script"
    bindElement.appendChild(scriptTag)
  }
}

function log(...params) {
  console.info(
    "%c🎧 Spotify!",
    "color:#1ED760;font-weight:bold",
    ...params
  )
}

const PlayerComponent = defineAsyncComponent({

  loader: () => {
    return new Promise((resolve, reject): void => {
      /**
       * If a player is already initiated, load it back up.
       */
      if (window.activeSpotify) {
        log('Reattaching previously loaded spotify player')
        spotifyPlayer.value = window.activeSpotify
        return resolve(PlayerComponentX)
      }

      if (!props.apiToken) {
        return reject('Missing API Token')
      }

      /**
       * Add the Spotify SDK when the component is loaded
       */
      watch(sdkInsertElement, (): void => {
        importSpotifySDK(sdkInsertElement.value)
      })

      window.onSpotifyWebPlaybackSDKReady = (): void => {

        const player = new Spotify.Player({
          name: props.streamName,
          getOAuthToken: cb => { cb(props.apiToken) },
          volume: props.defaultVolume / 100
        })


        /**
         * Error Handling
         */
        const errorHandler = ({ message }): void => {
          console.error('initialization_error', message)
          reject(message)
        }
        player.addListener('not_ready', ({ device_id }) => {
          log('Device ID has gone offline', device_id)
          reject('Unable to connect to device')
        })
        player.addListener('initialization_error', errorHandler)
        player.addListener('authentication_error', errorHandler)
        player.addListener('account_error', errorHandler)
        player.addListener('autoplay_failed', () => {
          log('Autoplay is not allowed by the browser autoplay rules')
          player.activateElement()
        })

        /**
         * Ready/Success Handling
         */
        player.connect().then(success => {
          if (success) {
            log('Successfully connected to Spotify as ${props.streamName}!')
          }
        })
        player.addListener('ready', ({ device_id }) => {
          log('Ready with Device ID', device_id)
          /**
           * Make the component available
           * Attach connected player to window
           */
          spotifyPlayer.value = window.activeSpotify = player
          resolve(PlayerComponentX)
        })
      }

    })
  },

  // A component to use while the async component is loading
  loadingComponent: PlayerLoading,

  // Delay before showing the loading component. Default: 200ms.
  // delay: 200,

  // A component to use if the load fails
  // errorComponent: ErrorComponent,

  // The error component will be displayed if a timeout is
  // provided and exceeded. Default: Infinity.
  // timeout: 3000
})

</script>

<template>
	<div ref="sdkInsertElement"></div>
	<PlayerComponent
		:player="spotifyPlayer"
		:defaultVolume="defaultVolume / 100"
		:allowControls="allowControls"
	></PlayerComponent>
</template>
