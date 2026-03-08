<template>
  <el-dialog v-model="dialogVisible" title="提示" width="400px" @close="handleClose">
    <div class="center">
      <p class="title">{{ $t('msg.theme.themeColorChange') }}</p>
      <el-color-picker-panel v-model="mColor" :predefine="predefineColors" />
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="handleConfirm">
          {{ $t('msg.universal.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useThemeStore } from '@/stores/theme'
import colorTool from '@/utils/theme'

const dialogVisible = defineModel<boolean>({
  default: false
})

const themeStore = useThemeStore()

const mColor = ref(themeStore.getMainColor)
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]
const handleClose = () => {
  dialogVisible.value = false
}
const handleConfirm = () => {
  themeStore.setMainColor(mColor.value)
  colorChange()
  handleClose()
}

const colorChange = () => {
  document.documentElement.style.setProperty('--el-color-primary', mColor.value)
  for (let i = 1; i <= 9; i++) {
    document.documentElement.style.setProperty(
      `--el-color-primary-light-${i}`,
      colorTool.lighten(mColor.value, i / 10)
    )
  }

  //透明
  document.documentElement.style.setProperty(`--el-color-primary-light-10`, mColor.value + 15)

  for (let i = 1; i <= 9; i++) {
    document.documentElement.style.setProperty(
      `--el-color-primary-dark-${i}`,
      colorTool.darken(mColor.value, i / 10)
    )
  }
}
if (themeStore.getMainColor) {
  colorChange()
}
</script>

<style scoped lang="scss">
.center {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
