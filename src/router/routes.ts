import { RouteRecordRaw } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'rag',
    component: () => import('@/views/llm/rag.vue'),
    meta: { auth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/login.vue'),
    meta: { guest: true },
  },
  {
    path: '/registry',
    name: 'registry',
    component: () => import('@/views/auth/registry.vue'),
    meta: { guest: true },
  },

] as RouteRecordRaw[]
export default routes
