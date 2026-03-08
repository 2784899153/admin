<template>
  <div class="app-wrapper" :class="[appStore.getSideBarOpened ? 'openSidebar' : 'hideSidebar']">
    <!-- 左侧menu -->
    <Sidebar
      class="sidebar-container"
      :style="{ backgroundColor: themeStore.cssVar.menuBg }"
      id="guide-sidebar"
    />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部的 navbar -->
        <Navbar />
        <!-- tgs -->
        <TagViews id="guide-tags" />
      </div>
      <!-- 内容区 -->
      <AppMain />
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar/index.vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import TagViews from '@/components/TagViews/index.vue'

import { useAppStore } from '@/stores/app'
import { useThemeStore } from '@/stores/theme'
const appStore = useAppStore()
const themeStore = useThemeStore()
</script>

<style scoped lang="scss">
@use '@/styles/mixin.scss' as *;
@use '@/styles/variables.module.scss' as *;

.app-wrapper {
  @include clearfix;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
