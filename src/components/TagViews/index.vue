<template>
  <div class="tags-view-container">
    <el-scrollbar>
      <router-link
        class="tags-view-item"
        :class="isActive(tag) ? 'active' : ''"
        :style="{
          backgroundColor: isActive(tag) ? themeStore.cssVar.menuBg : '',
          borderColor: isActive(tag) ? themeStore.cssVar.menuBg : ''
        }"
        v-for="(tag, index) in appStore.getTagsViewList"
        :key="tag.fullPath"
        :to="{ path: tag.fullPath }"
        @contextmenu.prevent="openMenu($event, index)"
      >
        {{ tag.title }}
        <el-icon
          class="elIconClose"
          v-show="!isActive(tag)"
          @click.prevent.stop="onCloseClick(index)"
          ><CircleCloseFilled
        /></el-icon>
      </router-link>
      <ContextMenu v-show="visible" :style="menuStyle" :index="selectIndex" />
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { useThemeStore } from '@/stores/theme'
import { useRoute } from 'vue-router'
import ContextMenu from './ContextMenu.vue'
import { ref, watch } from 'vue'

const appStore = useAppStore()
const themeStore = useThemeStore()
const route = useRoute()

const isActive = (tag: any) => {
  return tag.path === route.path
}

const onCloseClick = (index: number) => {
  appStore.delectTagsViewList(index, 'index')
}

// ContextMenu 相关
const selectIndex = ref(0)
const visible = ref(false)
const menuStyle = ref({
  left: 0,
  top: 0
})

const openMenu = (e: any, index: number) => {
  const { x, y } = e
  menuStyle.value.left = x + 'px'
  menuStyle.value.top = y + 'px'
  selectIndex.value = index
  visible.value = true
}

const closeMenu = () => {
  visible.value = false
}

watch(visible, (val) => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
</script>

<style scoped lang="scss">
.tags-view-container {
  height: 34px;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.12),
    0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: ' ';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    .elIconClose {
      width: 16px;
      height: 16px;
      line-height: 10px;
      vertical-align: -2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &::before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
