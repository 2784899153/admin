<template>
  <el-dropdown class="theme" v-bind="$attrs" trigger="click" @command="handleSetTheme">
    <div class="">
      <el-tooltip :content="$t('msg.navBar.themeChange')">
        <svg-icon icon="change-theme" id="guide-theme" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>{{ $t('msg.theme.themeColorChange') }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 展示弹出层 -->
  <div>
    <SelectColor v-model="selectColorVisble" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SelectColor from './SelectColor.vue'

const selectColorVisble = ref<boolean>(false)
const handleSetTheme = () => {
  selectColorVisble.value = true
}
</script>

<style scoped></style>
