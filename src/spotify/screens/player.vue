<template>
	<div>
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
		<div v-else class="cards" :class="{ 'has-header': showHeader }">

      <v-card class="nowplaying">
        <div class="nowplaying__image">
          <img
            v-if="currentTrack"
            :src="currentTrack?.album?.images?.find(img => img?.size === 'SMALL')?.url"
          />
          <v-icon v-else name="signal_disconnected" large />
        </div>
        <div class="nowplaying__detail">
          <div>{{ currentTrack?.name || 'Spotify Disconnected' }}</div>
          <div style="font-size: 12px;">
            <template v-for="artist in currentTrack?.artists || []">
              <a :href="artist.url">{{ artist.name }}</a>,
            </template>
          </div>
        </div>
      </v-card>

      <v-card v-if="allowControls && currentTrack" class="controls">
        <v-button class="btn-action" x-small icon rounded @click="player.previousTrack()">
          <v-icon name="skip_previous" />
        </v-button>
        <v-button class="btn-action" icon rounded>
          <v-icon :name="isPlaying ? 'pause' : 'play_arrow'" @click="player.togglePlay()"/>
          <!-- -->
        </v-button>
        <v-button class="btn-action" x-small icon rounded>
          <v-icon name="skip_next" @click="player.nextTrack()"/>
        </v-button>
      </v-card>

      <v-card class="controls" v-if="allowControls && currentTrack">
        <p>Volume Slider:</p>
        <v-icon :name="volumeIcon" left clickable large>
          <span class="sr-only">Volume Toggle</span>
        </v-icon>
        <v-slider
          class="v-slider"
          aria-label="Volume Slider"
          :disabled="false"
          :max="1"
          :min="0"
          :step="0.01"
          v-model="volume"
        />
      </v-card>

      <v-card class="controls" v-if="allowControls && currentTrack">
        <p>Audio Track Slider:</p>
        <v-slider
          class="v-slider"
          aria-label="Audio Track Slider"
          :disabled="false"
          :max="state.duration"
          :min="0"
          :step="(currentTrack?.duration_ms / 60000) * 60"
          v-model="audioTrack"
        />
      </v-card>


		</div>

	</div>
</template>

<script setup lang="ts">
import { watch, ref, computed, onMounted, onBeforeUnmount } from 'vue'

const { player, defaultVolume, allowControls } = defineProps<{
  player: string
  defaultVolume: number // 0-1
  allowControls: boolean
}>()

const audioTrack = ref(0)
watch(audioTrack, (newValue) => {
  player.seek(newValue).then(() => {
    console.log('Audio Seek updated!')
  })
})

const volume = ref(defaultVolume)
watch(volume, (newValue) => {
  player.setVolume(newValue).then(() => {
    console.log('Volume updated!')
  })
})

const volumeIcon = computed(() => {
  if (volume.value === 0) return 'volume_off'
  if (volume.value < 0.2) return 'volume_mute'
  if (volume.value < 0.7) return 'volume_down'
  return 'volume_up'
})

const state = ref()
const currentTrack = ref()
const isPlaying = ref(false)



function updatePlayingState(data) {
  console.log('updatestate', data)

  state.value = { ...data }
  audioTrack.value = state.value?.position || 0
  currentTrack.value = state.value?.track_window?.current_track
  isPlaying.value = !state.value?.paused
}

onMounted(() => {
  console.log('Mounted')
  player.addListener('player_state_changed', updatePlayingState)
  player.getCurrentState().then(updatePlayingState)
  player.getVolume().then(vol => volume.value = vol)

})
onBeforeUnmount(() => {
  console.log('Un Mounted')
  player.removeListener('player_state_changed', updatePlayingState)
})

player.on('playback_error', ({ message }) => {
  console.error('Failed to perform playback', message)
})
</script>

<style scoped>
.text {
	padding: 12px;
}

.text.has-header {
	padding: 0 12px;
}

.sr-only {
	visibility: hidden;
}


.cards  {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}



.v-slider {
  margin-top: 0.5rem;
}


.controls {
  display: flex;
  justify-content: space-evenly;
  align-items: space-between;
  padding: 1rem;
}



.nowplaying {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
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
.nowplaying__detail {
  display: flex;
  flex-direction: column;
}
</style>
