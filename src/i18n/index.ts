import { createI18n } from 'vue-i18n'
import mZhLocale from './lang/zh'
import mEnLocale from './lang/en'

const messages = {
  en: {
    msg: {
      ...mEnLocale
    }
  },
  zh: {
    msg: {
      ...mZhLocale
    }
  }
}

const locale = localStorage.getItem('lang') || 'zh'

const i18n = createI18n({
  locale,
  fallbackLocale: 'en',
  legacy: false, // 禁用旧版模式
  globalInjection: true,
  messages
})

export default i18n
