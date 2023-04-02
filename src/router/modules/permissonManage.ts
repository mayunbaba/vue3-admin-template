import layout from '@/layout/index.vue';

export default {
  path: '/permission',
  component: layout,
  redirect: '/permission/users',
  meta: {
    title: '权限管理',
    iconName: 'Lock',
  },
  children: [
    {
      path: '/permission/users',
      name: 'Users',
      component: () => import('@/views/permission/users.vue'),
      meta: {
        title: '用户管理',
      },
    },
    {
      path: '/permission/roles',
      name: 'PermissionRoles',
      component: () => import('@/views/permission/roles.vue'),
      meta: {
        title: '角色管理',
      },
    },
    {
      path: '/permission/menus',
      name: 'PermissionMenus',
      component: () => import('@/views/permission/menus.vue'),
      meta: {
        title: '菜单管理',
      },
    },
  ],
};
