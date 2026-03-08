<template>
  <el-dropdown class="international" trigger="click" @command="handleSetLanguage">
    <div>
      <el-tooltip :effect="effect" content="国际化">
        <svg-icon icon="language" id="guide-lang"></svg-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="appStore.getLanguage === 'zh'" command="zh"
          >中文</el-dropdown-item
        >
        <el-dropdown-item :disabled="appStore.getLanguage === 'en'" command="en"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'

interface Props {
  effect?: 'dark' | 'light'
}
const props = withDefaults(defineProps<Props>(), {
  effect: 'dark'
})

const appStore = useAppStore()

const handleSetLanguage = (lang: string) => {
  appStore.setLanguage(lang)
}
</script>

<style scoped></style>
