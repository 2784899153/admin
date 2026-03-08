<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="item.path">
        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">{{
          generateTitle(item.meta.title)
        }}</span>
        <a v-else class="redirect" @click.prevent="onLinkClick(item)">
          {{ generateTitle(item.meta.title) }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { generateTitle } from '@/utils/i18n'

const route = useRoute()
const router = useRouter()
const themeStore = useThemeStore()

// 生成数据
const breadcrumbData = ref<any[]>([])
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter((item) => item.meta && item.meta.title)
}

watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true
  }
)

const onLinkClick = (item: any) => {
  router.push(item.path)
}
const linkHoverColor = ref(themeStore.cssVar.menuBg)
</script>

<style scoped lang="scss">
@use '@/styles/transition.scss' as *;
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  :deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }
  .redirect {
    color: #666;
    font-weight: 600;
    &:hover {
      color: v-bind(linkHoverColor);
    }
  }
}
</style>
