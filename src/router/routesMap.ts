export default {
  '/dashboard': () => import('@/views/dashboard.vue'),
  '/permission/users': () => import('@/views/permission/users.vue'),
  '/permission/roles': () => import('@/views/permission/roles.vue'),
  '/permission/menus': () => import('@/views/permission/menus.vue'),
};
