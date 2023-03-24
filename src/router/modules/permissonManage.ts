import layout from '@/layout/index.vue';

export default {
  path: '/permission',
  component: layout,
  redirect: '/permission/user',
  meta: {
    title: '权限管理',
    iconName: 'Lock',
  },
  children: [
    {
      path: '/permission/user',
      name: 'PermissionUser',
      component: () => import('@/views/permission/user/user.vue'),
      meta: {
        title: '用户管理',
      },
    },
    {
      path: '/permission/role',
      name: 'PermissionRole',
      component: () => import('@/views/permission/role/role.vue'),
      meta: {
        title: '角色管理',
      },
    },
  ],
};
