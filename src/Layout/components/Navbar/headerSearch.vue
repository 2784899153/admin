<template>
  <div class="header-search" :class="{ show: isShow }">
    <svg-icon class-name="search-icon" icon="search" id="guide-search" @click.stop="onShowClick" />
    <el-select
      ref="searchSelectRef"
      class="header-search-select"
      v-model="search"
      placeholder="Search"
      filterable
      remote
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="opt in searchOptions"
        :key="opt.item.path"
        :label="opt.item.title.join(' > ')"
        :value="opt.item"
      />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue'
import Fuse from 'fuse.js'
import { useRouter } from 'vue-router'
import path from 'path-browserify'
import i18n from '@/i18n'

const router = useRouter()

const isShow = ref(false)
const searchSelectRef = useTemplateRef('searchSelectRef')

const onShowClick = () => {
  isShow.value = !isShow.value
  searchSelectRef.value.focus()
}

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

const generateRoutes = (routes: any, basePath = '/', prefixTitle = []) => {
  let result: any = []
  for (const route of routes) {
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }

    if (route.meta && route.meta.title && !route.meta.hidden) {
      const i18ntitle = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, i18ntitle]
      result.push(data)
    }
    // 存在children 迭代
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length >= 1) {
        result = [...result, ...tempRoutes]
      }
    }
  }
  return result
}

// 检索数据源

const searchPool = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateRoutes(filterRoutes)
})

const fuse = new Fuse(searchPool.value, {
  // 是否按优先级进行排序
  shouldSort: true,
  // 匹配长度超过这个值才会被认为是匹配
  minMatchCharLength: 1,
  // 将被搜索的键列表
  // name:搜索的键
  // weight:对应的权重
  keys: [
    {
      name: 'title',
      weight: 0.7
    },
    {
      name: 'path',
      weight: 0.3
    }
  ]
})

const search = ref('')
interface searchTypeItem {
  title: string[]
  path: string
}

interface searchType {
  item: searchTypeItem
}
const searchOptions = ref<searchType[]>([])
const querySearch = (query: any) => {
  if (query !== '') {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}
const onSelectChange = (val: searchTypeItem) => {
  router.push(val.path)
}

const onClose = () => {
  searchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
}

watch(isShow, (val) => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})
</script>

<style scoped lang="scss">
.header-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0px;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
