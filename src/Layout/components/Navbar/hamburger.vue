<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon class="hamburger" :icon="appStore.getSideIcon" id="guide-hamburger"></svg-icon>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const toggleClick = () => {
  appStore.changeSidebarOpened()
}
</script>

<style scoped lang="scss">
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
