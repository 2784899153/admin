import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/Layout/index.vue'
import login from './login/index'
import article from './article/index'
import user from './user/index'

/* 
  公开路由表
*/
const publicRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'Avatar',
          activeMenu: '/'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404.vue'),
        meta: {
          hidden: true
        }
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401.vue'),
        meta: {
          hidden: true
        }
      }
    ]
  },
  ...login // 登录
]

/* 私有路由表 */
export const privateRoutes = [...article, ...user]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: publicRoutes
})

export default router
