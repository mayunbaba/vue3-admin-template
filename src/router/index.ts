import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';
import permissonManage from './modules/permissonManage';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login.vue'),
    hidden: true, // 不在侧边栏显示
    meta: {
      title: '登录',
    },
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/dashboard.vue'),
        meta: {
          title: '首页',
          iconName: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/scenic',
    component: Layout,
    children: [
      {
        path: '/scenic',
        name: 'scenic',
        component: () => import('@/views/scenic/scenic.vue'),
        meta: {
          title: '旅游景区',
          iconName: 'Location',
        },
      },
    ],
  },
  permissonManage,
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue'),
    hidden: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
