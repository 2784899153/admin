<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import i18n from '@/i18n'

const route = useRoute()
const appStore = useAppStore()

// 生成title
const getTitle = (route: any) => {
  let title = ''
  // 处理没有meta的路由
  if (!route.meta) {
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = route.meta.title
  }
  return title
}

// 不需要记录
const whiteList = ['/login', '/import', '/404', '/401']

const isTags = (path: string) => {
  return !whiteList.includes(path)
}

watch(
  route,
  (to, from) => {
    if (!isTags(to.path)) return
    const { fullPath, meta, name, params, path, query } = to
    const title = getTitle(to)
    appStore.addTagsViewList({
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title
    })
  },
  {
    immediate: true
  }
)
</script>

<style scoped lang="scss">
.app-main {
  min-width: calc(100vh - 50px - 43px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
