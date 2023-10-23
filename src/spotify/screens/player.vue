<template>
	<div class="spotify-player-root">
		<div v-if="!player">
			<v-progress-circular large indeterminate />
		</div>
    <!-- <div v-if="!isActive">
      <p>
        We are ready to start playing music!
      </p>
      <p>
        Please use the spotify app to transfer the music over to Directus.
      </p>
    </div> -->
		<div v-else class="cards relative">

      <!-- Playing -->
      <v-card class="card--audiodetails">
        <!-- Current -->
        <div class="nowplaying" id="spotify-current">
          <div class="nowplaying__image">
            <img
              v-if="trackWindow?.current_track"
              :src="trackWindow?.current_track?.album?.images?.find(img => img?.size === 'SMALL')?.url"
              :key="trackWindow?.current_track?.album?.images?.find(img => img?.size === 'SMALL')?.url"
            />
            <v-icon v-else name="signal_disconnected" large />
          </div>
          <div class="nowplaying__detail">
            <div>{{ trackWindow?.current_track?.name || 'Spotify Disconnected' }}</div>
            <div class="text-sm">
              <template v-for="artist in trackWindow?.current_track?.artists || []">
                <a href="#">{{ artist.name }}</a>,
              </template>
            </div>
          </div>
        </div>
        <!-- Previous -->
        <div class="nowplaying" v-if="trackWindow && trackWindow?.previous_tracks[0]">
          <div class="nowplaying__image nowplaying__image--small">
            <img
              v-if="trackWindow?.previous_tracks[1]"
              :src="trackWindow?.previous_tracks[1]?.album?.images?.find(img => img?.size === 'SMALL')?.url"
              :key="trackWindow?.previous_tracks[1]?.album?.images?.find(img => img?.size === 'SMALL')?.url"
            />
          </div>
          <span class="text-sm">Last Played: <br />{{ trackWindow?.previous_tracks[1]?.name }}</span>
        </div>
        <!-- Next -->
        <div class="nowplaying" v-if="trackWindow && trackWindow?.next_tracks[0]">
          <div class="nowplaying__image nowplaying__image--small">
            <img
              v-if="trackWindow?.next_tracks[0]"
              :src="trackWindow?.next_tracks[0]?.album?.images?.find(img => img?.size === 'SMALL')?.url"
              :key="trackWindow?.next_tracks[0]?.album?.images?.find(img => img?.size === 'SMALL')?.url"
            />
          </div>
          <span class="text-sm">Up Next: <br />{{ trackWindow?.next_tracks[0]?.name }}</span>
        </div>
      </v-card>

      <!-- Controls -->
      <v-card v-if="allowControls && trackWindow" class="controls">
        <icon-shuffle :isShuffled="state.isShuffling" />
        <v-button class="btn-" align-center icon outlined small rounded  kind="info" @click="player.previousTrack()">
          <v-icon name="skip_previous" />
        </v-button>
        <v-button class="btn-action" icon rounded>
          <v-icon :name="state.isPlaying ? 'pause' : 'play_arrow'" @click="player.togglePlay()"/>
        </v-button>
        <v-button class="btn-" align-center icon outlined small rounded kind="info" @click="player.nextTrack()">
          <v-icon name="skip_next" />
        </v-button>
        <icon-repeat :repeatMode="state.repeatMode" />
      </v-card>

      <!-- Audio Seek -->
      <v-card class="controls controls--seek" v-if="allowControls && trackWindow">
        <span-live-time shouldCountUp :milliseconds="state.currentDurationSync" />
        <v-slider
          class="v-slider"
          aria-label="Audio Track Slider"
          :disabled="false"
          :max="trackWindow?.current_track?.duration_ms"
          :min="0"
          :step="(trackWindow?.current_track?.duration_ms / 60000) * 60"
          v-model="audioTrack"
        />
        <span-live-time :milliseconds="trackWindow?.current_track?.duration_ms"/>
      </v-card>

      <!-- Volume -->
      <v-card class="controls" v-if="allowControls && trackWindow">
        <div style="display:flex;">
          <icon-volume v-model="volume" :defaultVolume="defaultVolume"/>
          <v-slider
            class="v-slider"
            aria-label="Volume Slider"
            :disabled="false"
            :max="1"
            :min="0"
            :step="0.01"
            v-model="volume"
          />
        </div>
      </v-card>


		</div>

	</div>
</template>

<script setup lang="ts">
// Helpers
import { watch, ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { debounce } from 'lodash'

// Components
import iconRepeat, { type RepeatMode } from '../components/icon-repeat.vue'
import iconShuffle from '../components/icon-shuffle.vue'
import iconVolume from '../components/icon-volume.vue'

import spanLiveTime from '../components/span-live-time.vue'

type WebPlaybackState = {
  context: {
    uri?: 'spotify:album:xxx', // The URI of the context (can be null)
    metadata?: {},             // Additional metadata for the context (can be null)
  },
  disallows: {                // A simplified set of restriction controls for
    pausing: false | undefined,           // The current track. By default, these fields
    peeking_next: false | undefined,      // will either be set to false | undefined, which
    peeking_prev: false | undefined,      // indicates that the particular operation is
    resuming: false | undefined,          // allowed. When the field is set to `true`, this
    seeking: false | undefined,           // means that the operation is not permitted. For
    skipping_next: false | undefined,     // example, `skipping_next`, `skipping_prev` and
    skipping_prev: false | undefined      // `seeking` will be set to `true` when playing an ad track.
  },
  paused: boolean,  // Whether the current track is paused.
  position: 0,    // The position_ms of the current track.
  repeat_mode: 0, // The repeat mode. No repeat mode is 0, repeat context is 1 and repeat track is 2.
  shuffle: boolean, // True if shuffled, false otherwise.
  track_window: {
    current_track: WebPlaybackTrack,      // The track currently on local playback
    previous_tracks: WebPlaybackTrack[],  // Previously played tracks. Number can vary.
    next_tracks: WebPlaybackTrack[]       // Tracks queued next. Number can vary.
  }
}

type WebPlaybackTrack = {
  uri: "spotify:track:xxxx", // Spotify URI
  id: "xxxx",                // Spotify ID from URI (can be null)
  type: "track",             // Content type: can be "track", "episode" or "ad"
  media_type: "audio",       // Type of file: can be "audio" or "video"
  name: "Song Name",         // Name of content
  is_playable: true,         // Flag indicating whether it can be played
  album: {
    uri: 'spotify:album:xxxx', // Spotify Album URI
    name: 'Album Name',
    images: [
      { url: "https://image/xxxx" }
    ]
  },
  artists: [
    { uri: 'spotify:artist:xxxx', name: "Artist Name" }
  ]
}

const props = defineProps<{
  player: string
  defaultVolume: number // 0-1
  allowControls: boolean
}>()

const audioTrack = ref(0)
const audioTrackUpdate = debounce(async (newValue): Promise<void> => { props.player.seek(newValue) }, 250)
watch(audioTrack, (newValue): void => audioTrackUpdate(newValue))

const volume = ref(props.defaultVolume)
const volumeUpdate = debounce(async (newValue): Promise<void> => { props.player.setVolume(newValue) }, 50)
watch(volume, (newValue): void => volumeUpdate(newValue))





type PlayerState = {
  isPlaying: boolean
  isShuffling: boolean
  repeatMode: RepeatMode
  currentDurationSync: number
}
const state = reactive<PlayerState>({
  isPlaying: false,
  isShuffling: false,
  repeatMode: 0,
  currentDurationSync: 0,
})



const trackWindow = ref()

/**
 * To be called when:
 * Spotify emits `player_state_changed` event.
 * Whenever `getCurrentState()` function is called.
 *
 * @param data
 */
async function updatePlayingState(data: WebPlaybackState): Promise<void> {
  // state.value = ref({ ...data })
  state.isPlaying = !data.paused
  state.isShuffling = data.shuffle
  state.repeatMode = data.repeat_mode
  state.currentDurationSync = data.position

  audioTrack.value = data?.position || 0

  trackWindow.value = data?.track_window
  volume.value = await props.player.getVolume()

  console.log('updatestate', data)
}

onMounted(() => {
  props.player.addListener('player_state_changed', updatePlayingState)
  props.player.getCurrentState().then(updatePlayingState)
  props.player.getVolume().then(vol => volume.value = vol)

})
onBeforeUnmount(() => {
  props.player.removeListener('player_state_changed', updatePlayingState)
})

props.player.on('playback_error', ({ message }) => {
  console.error('Failed to perform playback', message)
})
</script>

<style scoped>
/** Global */
.spotify-player-root {
  /* Custom Variables */
  --spotify-color: #1ED760;
  --spotify-color-darker: #1ab920;
  /* VSlider */
  --background-page: var(--v-card-background-color);
  /* Standard */
  /* --v-button-background-color: var(--spotify-color); */
  /* --v-button-background-color: var(--spotify-color); */
  /* --v-button-background-color-hover: var(--spotify-color-darker); */
  /* --v-button-background-color-active: var(--spotify-color-darker); */
  /* Outline */
  /* --v-button-color: var(--spotify-color); */
  /* --v-button-background-color-hover: var(--spotify-color-darker); */
  /* --v-button-background-color-hover: var(--spotify-color-darker); */
}
.sr-only {
	visibility: hidden;
}
.text-sm {
  font-size: 12px;
}
.text-spotify-green {
  color: var(--v-button-background-color);
}

/** Player Specific */

.cards  {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}



.v-slider {
  margin-top: 0.5rem;
}


.card--audiodetails {
  display:flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
}


.controls {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 1rem;
}
.controls--seek {
  justify-content: space-between;
}
.controls--seek .v-slider {
  flex-grow: 1;
  padding: 0 1rem;
}



.nowplaying {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1rem;
}
.nowplaying__image {
  width:64px;
  height:64px;
  background: var(--background-normal-alt);
  border-radius: 5px;

  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
}
.nowplaying__image--small {
  width:32px;
  height:32px;
}

.nowplaying__detail {
  display: flex;
  flex-direction: column;
}
</style>
