import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/styles/index.scss'
import SvgIcon from '@/components/SvgIcon/index.vue'
//引入注册脚本
import 'virtual:svg-icons-register'
import './permission' // 路由守卫
import i18n from '@/i18n'
import 'element-plus/dist/index.css'
import filters from '@/filters/index'
import print from '@/directives/index'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 注册全局SvgIcon组件
app.component('SvgIcon', SvgIcon)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(i18n)
print(app)
filters(app)

app.mount('#app')
