import { RouteRecordRaw } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue'),
  },
  // {
  //   path: '/admin',
  //   name: '/admin',
  //   component: () => import('@/views/admin/home.vue'),
  //   meta: { auth: true }
  // },
  {
    path: '/llm',
    name: 'llm',
    component: () => import('@/views/llm/dev.vue'),
    meta: { auth: true }
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

  {
    path: '/:any(.*)',
    name: 'notFound',
    component: () => import('@/views/errors/404.vue'),
    meta: { guest: true },
  },
] as RouteRecordRaw[]
export default routes
