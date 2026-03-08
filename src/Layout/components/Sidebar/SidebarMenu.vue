<template>
  <el-menu
    :uniqueOpened="true"
    :default-active="activeMenu"
    :background-color="themeStore.cssVar.menuBg"
    :text-color="themeStore.cssVar.menuText"
    :active-text-color="themeStore.cssVar.menuActiveText"
    :collapse="!appStore.getSideBarOpened"
    router
  >
    <SidebarItem v-for="item in routes" :key="item.path" :route="item" />
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { useAppStore } from '@/stores/app'
import SidebarItem from './SidebarItem.vue'

const router = useRouter()
const themeStore = useThemeStore()
const appStore = useAppStore()
// 获取所有已注册的路由记录

// 获取所有子路由
const getChildrenRoutes = (routes: any) => {
  const result: any = []
  routes.forEach((route: any) => {
    if (route?.children?.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

// 处理脱离层级的路由( 一级路由不能为其他路由的子路由) 拿到完整的路由格式
const filterRouters = (routes: any) => {
  // 获取所有的子路由
  const childrenRoutes: any = getChildrenRoutes(routes)

  return routes.filter((route: any) => {
    // 匹配 路由路径不等于子路由的
    return !childrenRoutes.find((childrenRoute: any) => childrenRoute.path === route.path)
  })
}

const generateMenus = (routes: any) => {
  return routes
    .filter((item: any) => !item?.meta?.hidden)
    .map((item: any) => {
      const newItem = { ...item }
      if (newItem.children?.length) {
        newItem.children = generateMenus(item.children)
      }
      return newItem
    })
}

const routes = computed(() => {
  const fullRoutes = router.getRoutes()
  const filterRoutes = filterRouters(fullRoutes)
  return generateMenus(filterRoutes)
})

// 计算高亮 menu 方法
const route = useRoute()
const activeMenu = computed(() => {
  const { path, meta = {} } = route
  return meta.activeMenu || path
})
</script>

<style scoped></style>
