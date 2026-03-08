<template>
  <!-- 展示外部图标 -->
  <div
    v-if="isExternal"
    class="svg-external-icon svg-icon"
    :class="className"
    :style="styleExternalIcon"
  ></div>
  <!-- 展示内部图标 -->
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isExternal as external } from '@/utils/validate'

const props = defineProps<{
  icon: string // 图标
  className?: string // 图标类名
}>()

// 判断当前图标是否为外部图标
const isExternal = computed(() => external(props.icon))
// 外部图标样式
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))
// 内部图标
const iconName = computed(() => `#icon-${props.icon}`)
</script>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor; /* 跟随当前文字颜色*/
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  display: inline-block;
  mask-size: cover !important; /* 确保 图标保持比例不拉伸 */
}
</style>
