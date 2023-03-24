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
    path: '/首页',
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
      {
        path: '/factory',
        name: 'Factory',
        component: () => import('@/views/factory/factory.vue'),
        meta: {
          title: '工厂管理',
          iconName: 'HomeFilled',
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
