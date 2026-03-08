import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const time_stamp = ref()
    const TOKEN_TIMEOUT_VALUE = 2 * 3600 * 3600
    // 获取时间戳
    const getTimeStamp = computed(() => time_stamp.value)
    // 设置时间戳
    const setTimeStamp = () => {
      time_stamp.value = Date.now()
    }
    // 是否超时
    const isCheckTimeout = () => {
      const currentTime = Date.now()
      return currentTime - getTimeStamp.value > TOKEN_TIMEOUT_VALUE
    }
    return {
      time_stamp,
      setTimeStamp,
      isCheckTimeout
    }
  },
  {
    persist: true
  }
)
