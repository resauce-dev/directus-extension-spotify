<template>
  <v-icon :title="label" :name="icon"  :class="isShuffled ? 'text-spotify-green' : ''">
    <span class="sr-only">{{ label }}</span>
  </v-icon>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type ShuffleIcon = 'shuffle_on' | 'shuffle'

const props = defineProps<{
  isShuffled: boolean
}>()

const icon = computed<ShuffleIcon>((): ShuffleIcon => {
  if (props.isShuffled) return 'shuffle_on'
  return 'shuffle'
})

const label = computed<string>((): string => 'Shuffle ' + props.isShuffled ? 'On' : 'Off')
</script>
