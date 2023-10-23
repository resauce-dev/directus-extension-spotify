<template>
  <v-icon :title="label" :name="icon" left clickable @click="toggleMute">
    <span class="sr-only">{{ label }}</span>
  </v-icon>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type VolumeValue = number
export type VolumeIcon = 'volume_off' | 'volume_mute' | 'volume_down' | 'volume_up'

const props = defineProps<{
  modelValue: VolumeValue
  defaultVolume: VolumeValue
}>()

const emit = defineEmits(['update:modelValue'])

const icon = computed((): VolumeIcon => {
  if (props.modelValue === 0) return 'volume_off'
  if (props.modelValue < 0.2) return 'volume_mute'
  if (props.modelValue < 0.7) return 'volume_down'
  return 'volume_up'
})

const label = computed((): string => {
  if (props.modelValue > 0) return 'Mute Sound'
  return 'Unmute Sound'
})

function toggleMute(): void {
  if (props.modelValue > 0) {
    return emit('update:modelValue', 0)
  }
  return emit('update:modelValue', props.defaultVolume)
}
</script>
