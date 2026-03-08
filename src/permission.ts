import router from '@/router'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'
import { usePressionStore } from '@/stores/pression'

// 白名单
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const authStore = useAuthStore()
  const pressionStore = usePressionStore()
  const token = userStore.getUser?.token
  // 1. 用户已登录 则不允许进入 login
  if (token) {
    if (authStore.isCheckTimeout()) {
      // 登出
      userStore.userLogout()
      return Promise.reject(new Error('token 失效'))
    }
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否获取
      // 诺不存在用户信息，则获取用户信息

      if (!userStore.getUserInfo) {
        const data = await userStore.loadUserInfo()
        // 拿到要筛选的条件
        console.log('111222', data.permission)
        const filterRoute = pressionStore.filterRoutes(data.permission)
        filterRoute.forEach((item) => {
          router.addRoute(item)
        })
        return next(to.path)
      }
      next()
    }
  } else {
    // 2. 用户未登录 只允许进入 login
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
