<script setup lang="ts">
import { watch, ref } from 'vue'
import { defineAsyncComponent } from 'vue'
import PlayerLoading from './screens/player-loading.vue'
import PlayerComponentX from './screens/player.vue'

const props = defineProps<{
	showHeader: boolean
	apiToken: string
	streamName: string
	allowControls: boolean
	defaultVolume: number // 0-100
}>()

let spotifyPlayer = ref()
const rootComponent = ref()

const PlayerComponent = defineAsyncComponent({

	loader: () => {
		return new Promise((resolve, reject) => {

			/**
			 * If a player is already initiated, load it back up.
			 */
			if (window.activeSpotify) {
				spotifyPlayer.value = window.activeSpotify
				return resolve(PlayerComponentX)
			}

			if (!props.apiToken) {
				reject('Missing Spotify API Token')
			}

			/**
			 * Add the Spotify SDK
			 */
			watch(rootComponent, () => {
				if (!document.getElementById('spotify-script')) {
					var scriptTag = document.createElement("script")
					scriptTag.src = "https://sdk.scdn.co/spotify-player.js"
					scriptTag.id = "spotify-script"
				}
				rootComponent.value.appendChild(scriptTag)
			})

			window.onSpotifyWebPlaybackSDKReady = () => {

				spotifyPlayer.value = window.activeSpotify = new Spotify.Player({
					name: props.streamName,
					getOAuthToken: cb => { cb(props.apiToken) },
					volume: props.defaultVolume / 100
				})


				/**
				 * Error Handling
				 */
				const errorHandler = ({ message }) => {
					console.error('initialization_error', message)
					reject(message)
				}
				spotifyPlayer.value.addListener('not_ready', ({ device_id }) => {
					console.log('Device ID has gone offline', device_id)
					reject('Unable to connect to device')
				})
				spotifyPlayer.value.addListener('initialization_error', errorHandler)
				spotifyPlayer.value.addListener('authentication_error', errorHandler)
				spotifyPlayer.value.addListener('account_error', errorHandler)
				spotifyPlayer.value.addListener('autoplay_failed', () => {
					console.log('Autoplay is not allowed by the browser autoplay rules')
					reject(message)
				})

				/**
				 * Ready/Success Handling
				 */
				spotifyPlayer.value.connect().then(success => {
					if (success) {
						console.log('The Web Playback SDK successfully connected to Spotify!')
					}
				})
				spotifyPlayer.value.addListener('ready', ({ device_id }) => {
					console.log('Ready with Device ID', device_id)

					/**
					 * Make the component available
					 */
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
	<div ref="rootComponent" id="spotify-panel"></div>
	<PlayerComponent 
		:player="spotifyPlayer"
		:defaultVolume="defaultVolume / 100"
		:allowControls="allowControls"
	></PlayerComponent>
</template>
