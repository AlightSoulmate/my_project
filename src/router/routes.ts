import { RouteRecordRaw } from 'vue-router'

const routes = [
  {
    name: 'rag',
    path: '/rag',
    component: () => import('@/views/llm/rag.vue'),
    meta: { guest: true, menu: { title: 'RAG对话' } },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home.vue'),
    meta: { guest: true },
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
