<template>
  <el-config-provider :locale="currentLanguage">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import { useAppStore } from '@/stores/app'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

const appStore = useAppStore()
const currentLanguage = computed(() => {
  return appStore.getLanguage === 'zh' ? zhCn : en
})
</script>

<style scoped></style>
