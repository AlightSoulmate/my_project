import { RouteRecordRaw } from 'vue-router'

const routes = [
  {
    path: '/llm',
    name: 'llm',
    component: () => import('@/views/llm/dev.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue'),
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('@/views/article.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/login.vue'),
    meta: { guest: true },
  },

  {
    path: '/:any(.*)',
    name: 'notFound',
    component: () => import('@/views/errors/404.vue'),
    meta: { guest: true },
  },
] as RouteRecordRaw[]
export default routes
