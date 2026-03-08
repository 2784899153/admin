<template>
  <template v-if="icon">
    <el-icon v-if="isElIcon(icon)" size="15" style="transform: translateX(-4px)">
      <component :is="icon" />
    </el-icon>
    <svg-icon v-else :icon="props.icon"></svg-icon>
  </template>

  <span>{{ generateTitle(title) }}</span>
</template>

<script setup lang="ts">
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { generateTitle } from '@/utils/i18n'

const props = defineProps<{
  title: string
  icon?: string
}>()
const isElIcon = (name: string): boolean => {
  return Object.keys(ElementPlusIconsVue).includes(name)
}
</script>

<style scoped></style>
