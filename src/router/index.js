import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/dashboard',
          name: '首页',
          component: () => import('../views/dashboard.vue'),
        },
        {
          path: '/sql',
          name: 'SQL 控制台',
          component: () => import('../views/sql/index.vue'),
        },
        {
          path: '/table/create',
          name: '创建表',
          component: () => import('../views/table/create.vue'),
        },
      ],
    },
  ],
})

export default router
