import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import i18n from '@/i18n'
import { ElMessage } from 'element-plus'

export const useAppStore = defineStore(
  'app',
  () => {
    const sidebarOpened = ref(true) // 侧边栏开关
    const getSideBarOpened = computed(() => sidebarOpened.value)
    const getSideIcon = computed(() =>
      getSideBarOpened.value ? 'hamburger-opened' : 'hamburger-closed'
    )
    const changeSidebarOpened = () => {
      sidebarOpened.value = !sidebarOpened.value
    }

    const language = ref<string>(localStorage.getItem('lang') || 'zh') // 国际化语言

    const getLanguage = computed(() => language.value)
    const setLanguage = (lang: string) => {
      ;(i18n.global.locale as any).value = lang
      language.value = lang
      localStorage.setItem('lang', lang)
      ElMessage({
        message: i18n.global.t('msg.toast.switchLangSuccess'),
        type: 'success'
      })
    }

    const tagsViewList = ref<any[]>([])
    const getTagsViewList = computed(() =>
      tagsViewList.value.map((item) => ({
        ...item,
        title: i18n.global.t(`msg.route.${item.title}`)
      }))
    )
    // 添加tag
    const addTagsViewList = (tag: any) => {
      const isFind = tagsViewList.value.find((item) => item.path === tag.path)
      if (!isFind) {
        tagsViewList.value.push(tag)
      }
    }
    /* 
    index 当前
    right 右侧
    other 其他
    */
    const delectTagsViewList = (index: number, type: string) => {
      if (type === 'index') {
        tagsViewList.value.splice(index, 1)
      } else if (type === 'other') {
        tagsViewList.value.splice(index + 1, tagsViewList.value.length - index + 1)
        tagsViewList.value.splice(0, index)
      } else if (type === 'right') {
        tagsViewList.value.splice(index + 1, tagsViewList.value.length - index + 1)
      }
    }

    return {
      sidebarOpened,
      getSideBarOpened,
      getSideIcon,
      changeSidebarOpened,
      language,
      getLanguage,
      setLanguage,
      getTagsViewList,
      addTagsViewList,
      delectTagsViewList
    }
  },
  {
    persist: true
  }
)
