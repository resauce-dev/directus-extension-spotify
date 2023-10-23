<template>
  <v-icon :title="label" :name="icon" :class="isOnRepeat ? 'text-spotify-green' : ''">
    <span class="sr-only">{{ label }}</span>
  </v-icon>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type RepeatMode = 0 | 1 | 2
export type RepeatIcon = 'repeat' | 'repeat_on' | 'repeat_one_on'
export type RepeatLabel = string

const props = defineProps<{
  repeatMode: RepeatMode
}>()

const isOnRepeat = computed<boolean>((): boolean => {
  return props.repeatMode !== 0
})

const icon = computed<RepeatIcon>((): RepeatIcon => {
  if (props.repeatMode === 2) return 'repeat_one_on' // Song
  if (props.repeatMode === 1) return 'repeat_on' // Playlist
  return 'repeat' // Off
})

const label = computed<RepeatLabel>((): RepeatLabel => {
  if (props.repeatMode === 2) return 'Repeat Song'
  if (props.repeatMode === 1) return 'Repeat Playlist'
  return 'Repeat Off'
})
</script>
