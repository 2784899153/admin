import { ElMessage } from 'element-plus'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'

export const Url = import.meta.env.DEV ? '/api' : '待定'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use((config) => {
  const userStore = useUserStore()
  const appStore = useAppStore()
  if (userStore.getUser?.token) {
    config.headers.Authorization = `Bearer ${userStore.getUser.token}`
  }
  config.headers['Accept-Language'] = appStore.getLanguage
  config.headers.icode = 'helloqianduanxunlianying'

  return config
})

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    const { success, message, data } = res.data
    if (success) {
      return res.data
    } else {
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    const userStore = useUserStore()
    // 处理token 超时问题
    if (error?.response?.data?.code === 401) {
      userStore.userLogout()
    }
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

// 返回格式
export interface Response<T = any> {
  code: number
  data: T
  message: string
  success: boolean
}

export default service
