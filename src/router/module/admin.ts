import { RouteRecordRaw } from 'vue-router';
export default {
  name: 'admin',
  path: '/admin',
  meta: { auth: true, menu: { title: " 仪表盘", icon: "DashboardOne", show: true, } },
  component: () => import('@/layouts/admin.vue'),
  children: [
    {
      name: 'admin.workbench',
      path: 'workbench',
      component: () => import('@/views/admin/home.vue'),
      meta: { menu: { title: '工作台' } }
    },
    {
      name: 'admin.data',
      path: 'data',
      component: () => import('@/views/admin/data.vue'),
      meta: { menu: { title: '数据概览' } }
    }
  ]
} as RouteRecordRaw