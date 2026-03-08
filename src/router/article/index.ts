import Layout from '@/Layout/index.vue'
export default [
  {
    path: '/article',
    component: Layout,
    redirect: '/article/ranking',
    name: 'article',
    meta: {
      title: 'article',
      icon: 'article'
    },
    children: [
      {
        path: '/article/ranking',
        component: () => import('@/views/article-ranking/index.vue'),
        name: 'articleRanking',
        meta: {
          title: 'articleRanking',
          icon: 'article-ranking'
        }
      },
      {
        path: '/article/:id',
        name: 'articleId',
        component: () => import('@/views/article-detail/index.vue'),
        meta: {
          title: 'articleDetail',
          hidden: true
        }
      },
      {
        path: '/article/create',
        name: 'articleCreate',
        component: () => import('@/views/article-create/index.vue'),
        meta: {
          title: 'articleCreate',
          icon: 'article-create'
        }
      },
      {
        path: '/article/editor/:id',
        name: 'articleEditorId',
        component: () => import('@/views/article-create/index.vue'),
        meta: {
          title: 'articleEditor',
          hidden: true
        }
      }
    ]
  }
]
