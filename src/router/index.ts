import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/layout/inedx.vue'
import Home from '@/views/home/index.vue'

const router = createRouter({
  history: createWebHistory(),
  // 让路由跳转时页面滚动到顶部
  scrollBehavior: () => {
    return {
      top: 0,
    }
  },
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: '', component: Home },
        { path: 'category/:id', component: () => import('@/views/category/index.vue') },
        { path: 'category/sub/:id', component: () => import('@/views/category/sub.vue') },
        { path: 'goods/:id', component: () => import('@/views/goods/index.vue') }
      ]
    },
    { path: '/login', component: () => import('@/views/login/index.vue') }
  ]
})

export default router
