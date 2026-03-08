<template>
  <div class="">
    <div class="logo-container">
      <el-avatar
        :size="logoHeight"
        shape="square"
        src="https://th.bing.com/th/id/OIP.rx3XigKF395VjFAMOgrqJAHaHd?w=188&h=189&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
      ></el-avatar>
      <h1 class="logo-title" v-if="appStore.getSideBarOpened">admin</h1>
    </div>
    <el-scrollbar>
      <SidebarMenu />
    </el-scrollbar>
  </div>
</template>

<script setup>
import SidebarMenu from './SidebarMenu.vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const logoHeight = 44
</script>

<style scoped lang="scss">
.logo-container {
  height: v-bind(logoHeight) + 'px';
  padding: 10px 0 22px 0;
  display: flex;
  align-content: center;
  justify-content: center;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
