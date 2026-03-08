<template>
  <div class="navbar">
    <Hamburger class="humburger-container" />
    <Breadcrumb class="breadcrumb-container" id="guide-breadcrumb" />
    <div class="right-menu">
      <!-- 引导 -->
      <Guide class="right-menu-item hover-effect" />
      <!-- 多语言 -->
      <LangSelect class="right-menu-item hover-effect" />
      <!-- 主题 -->
      <ThemeSelect class="right-menu-item hover-effect" />
      <!-- 全屏 -->
      <Screenfull class="right-menu-item hover-effect" />
      <!-- 搜索 -->
      <HeaderSearch class="right-menu-item hover-effect" />
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar shape="square" :size="40" :src="avatar" />
          <i class="el-icon-s-tools"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <a target="_blank" href="">
              <el-dropdown-item>课程主页</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout"> 退出登录 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { usePressionStore } from '@/stores/pression'
import avatar from '@/assets/avatar-default.webp'
import Hamburger from './hamburger.vue'
import Breadcrumb from './breadcrumb.vue'
import Screenfull from './screenfull.vue'
import HeaderSearch from './headerSearch.vue'
import Guide from './guide.vue'
import LangSelect from '@/components/LangSelect/index.vue'
import ThemeSelect from '@/components/ThemeSelect/index.vue'

const userStore = useUserStore()
const pressionStore = usePressionStore()

const logout = async () => {
  await pressionStore.resetRouter()
  userStore.userLogout()
}
</script>

<style scoped lang="scss">
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .humburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.5s;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;
    :deep(.avatar-container) {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
    :deep(.right-menu-item) {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
      }
    }
  }
}
</style>
