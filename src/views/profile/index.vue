<template>
  <div class="profile-container" id="printMe">
    <el-row :gutter="20">
      <!-- 用户信息卡片 -->
      <el-col :span="8">
        <el-card class="user-card" shadow="hover">
          <div class="user-header">
            <el-avatar :size="80" :src="avatar" class="avatar">
              <svg-icon icon="user" />
            </el-avatar>
            <h2 class="username">{{ userInfo?.username || '-' }}</h2>
            <p class="title">{{ userInfo?.title || '-' }}</p>
            <el-tag v-for="r in userInfo?.role" :key="r.id" size="small" class="role-tag">
              {{ r.title }}
            </el-tag>
          </div>
        </el-card>
      </el-col>
      <!-- 项目介绍 -->
      <el-col :span="16">
        <el-card class="intro-card" shadow="hover">
          <template #header>
            <span>基于 vite + ts + pinia 打造的后台综合管理系统</span>
          </template>
          <el-descriptions :column="1" border>
            <el-descriptions-item label="作者"> 百事可乐 </el-descriptions-item>
            <el-descriptions-item label="功能">此处省略一万字... </el-descriptions-item>
          </el-descriptions>
          <el-button style="margin-top: 10px" type="primary" v-print="printObj">打印</el-button>
          <el-button v-permission="['111']">测试</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useUserStore } from '@/stores/user'

import avatar from '@/assets/avatar-default.webp'

const userStore = useUserStore()

const userInfo = computed(() => userStore.getUserInfo)

const printLoading = ref(false)

const printObj = {
  id: 'printMe',
  popTitle: 'good print',
  extraCss:
    'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
  extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
  beforeOpenCallback() {
    printLoading.value = true
  },
  openCallback() {
    printLoading.value = false
  }
}

onMounted(() => {
  if (!userInfo.value) {
    userStore.loadUserInfo()
  }
})
</script>

<style lang="scss" scoped>
.profile-container {
  padding: 20px;
}

.user-card {
  .user-header {
    text-align: center;
    padding: 10px 0;

    .avatar {
      margin-bottom: 16px;
      background: var(--el-color-primary-light-5);
      color: var(--el-color-primary);
    }

    .username {
      margin: 0 0 8px;
      font-size: 20px;
      font-weight: 600;
    }

    .title {
      margin: 0 0 12px;
      color: var(--el-text-color-secondary);
      font-size: 14px;
    }

    .role-tag {
      margin: 0 4px 4px 0;
    }
  }
}

.intro-card {
  .muted {
    color: var(--el-text-color-secondary);
    font-size: 13px;
    margin-bottom: 16px;
    line-height: 1.6;
  }
}
</style>
