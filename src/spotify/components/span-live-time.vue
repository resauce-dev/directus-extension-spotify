<template>
  <span>{{ formatTimeFromMs(milliseconds + countSincePropChange) }}</span>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted, watch } from 'vue'

const props = withDefaults(defineProps<{
  shouldCountUp?: boolean
  milliseconds: number
}>(), {
  shouldCountUp: false
})

/**
 * Reset the count when we receive a new update
 */
watch(() => props.milliseconds, (newValue) => countSincePropChange.value = 0)

/**
 * Start counting if prompted to on init.
 */
const countSincePropChange = ref(0)
let intervalFunction: NodeJS.Timeout | undefined = undefined
onMounted((): void => {
  if (!props.shouldCountUp) return

  intervalFunction = setInterval(
    (): number => countSincePropChange.value += 1000,
    1000
  )
})
onBeforeUnmount((): void => clearInterval(intervalFunction))

/**
 * Format the time ready for display.
 */
function formatTimeFromMs(milliseconds: number): string {
  const time = new Date(Date.UTC(0, 0, 0, 0, 0, 0, milliseconds))

  const hasHours = time.getUTCHours() > 0

  const parts = [
    // Only pad the minutes if there are hours.
    String(time.getUTCMinutes()).padStart(hasHours ? 2 : 0, '0'),
    String(time.getUTCSeconds()).padStart(2, '0')
  ]

  if (hasHours) {
    parts.unshift(
      String(time.getUTCHours()).padStart(2, '0')
    )
  }

  return parts.map(
    timeString => timeString
  ).join(':')
}
</script>
