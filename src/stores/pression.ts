import { defineStore } from 'pinia'
import { ref } from 'vue'
import router, { privateRoutes } from '@/router'

export const usePressionStore = defineStore('pression', () => {
  // 1. 存储的是字符串（Name 或 Path），而不是整个对象
  const addedRouteNames = ref<string[]>([])

  const filterRoutes = (menus) => {
    const routes = []
    // --- 保持你原本的逻辑不变 ---
    routes.push(...privateRoutes)
    routes.push({
      path: '/:catchAll(.*)',
      name: 'catchAll', // 建议加上 name 方便识别
      redirect: '/404',
      meta: { hidden: true }
    })
    // -------------------------

    // 重点在这里：执行添加逻辑
    routes.forEach((route) => {
      // ✅ 修复点：记录标识符。如果数据没给 name，就用 path
      const identifier = route.name || route.path

      router.addRoute(route)

      // ✅ 修复点：存入字符串标识符
      addedRouteNames.value.push(identifier)
    })

    return routes
  }

  const resetRouter = () => {
    // ✅ 修复点：根据记录的标识符进行逐个删除
    addedRouteNames.value.forEach((nameOrPath) => {
      if (router.hasRoute(nameOrPath)) {
        router.removeRoute(nameOrPath)
        console.log('成功卸载：', nameOrPath)
      }
    })

    // 清空计数器
    addedRouteNames.value = []
  }

  return {
    filterRoutes,
    resetRouter
  }
})
