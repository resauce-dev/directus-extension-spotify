<template>
  <div class="loading">
    <v-progress-circular large indeterminate />
    <span>Connecting to Spotify...</span>
  </div>
</template>

<style>
.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 100%;
}
</style>