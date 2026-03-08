import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { LoginForm, LoginResult, UserResult } from '@/types/user'
import { login, getUserInfo as getUserInfoApi } from '@/api/sys'
import { useAuthStore } from './auth'
import md5 from 'md5'
import router from '@/router'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref<LoginResult | null>(null)
    const userInfo = ref<UserResult | null>(null)
    // 用户登录方法
    const userLogin = (params: LoginForm) => {
      const { username, password } = params
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then((res) => {
            if (res.success) {
              const authStore = useAuthStore()
              authStore.setTimeStamp()
              setUser(res.data)
              resolve(true)
            } else {
              resolve(false)
            }
          })
          .catch((err) => {
            reject('失败')
          })
      })
    }
    // 用户退出登录
    const userLogout = () => {
      user.value = null
      userInfo.value = null
      router.push('/login')
    }

    // 设置用户token
    const setUser = (params: LoginResult) => {
      user.value = params
    }
    // 获取用户token
    const getUser = computed(() => user.value)

    // 获取用户信息
    const loadUserInfo = () => {
      return new Promise((resolve, reject) => {
        getUserInfoApi()
          .then((res) => {
            setUserInfo(res.data)
            resolve(res.data)

            return res.data
          })
          .catch(() => {})
      })
    }

    // 读取用户信息
    const getUserInfo = computed(() => userInfo.value)
    //设置用户信息
    const setUserInfo = (params: UserResult) => {
      userInfo.value = params
    }

    return {
      user,
      userLogin,
      userLogout,
      setUser,
      getUser,
      loadUserInfo,
      getUserInfo,
      setUserInfo
    }
  },
  {
    persist: true
  }
)
