import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { generateNewStyle } from '@/utils/theme'
import varianles from '@/styles/variables.module.scss'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const mainColor = ref<string>('#409eff') // 主题色
    const cssVar = computed(() => ({ ...varianles, ...generateNewStyle(mainColor.value) }))
    const getMainColor = computed(() => mainColor.value)
    const setMainColor = (newColor: string) => {
      mainColor.value = newColor
    }
    return { cssVar, mainColor, getMainColor, setMainColor }
  },
  {
    persist: {
      pick: ['mainColor']
    }
  }
)
