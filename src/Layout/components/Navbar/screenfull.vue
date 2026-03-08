<template>
  <div class="">
    <svg-icon
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      id="guide-full"
      @click="onToggle"
    ></svg-icon>
  </div>
</template>

<script setup lang="ts">
import screenfull from 'screenfull'
import { onMounted, onUnmounted, ref } from 'vue'

// 是否全屏
const isFullscreen = ref(false)

const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}

const onToggle = () => {
  screenfull.toggle()
}
onMounted(() => {
  screenfull.on('change', change)
})
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>

<style scoped></style>
