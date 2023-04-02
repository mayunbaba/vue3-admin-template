import { defineStore } from 'pinia';
import users from '@/api/users';
import router from '@/router';

export default defineStore(
  'identityStore',
  () => {
    // state 修改state通过$patch
    const user = ref({
      username: '',
      email: '',
    });
    const token = ref('');

    // Actions
    const login = async (data: any) => {
      const res: any = await users.login(data);
      token.value = res.data.token;
      return res;
    };

    // 获取用户信息
    const getUserInfo = async () => {
      const res: any = await users.getUserInfo();
      const permission = res.data.menus;
      delete res.data.menus;
      user.value = res.data;
      const menusPermission = permission.filter((item: any) => item.type === 1);
      const btnPermission = permission.filter((item: any) => item.type === 2);
      console.log(permission, 'permission');
      console.log(menusPermission, btnPermission);
      // menusPermission.forEach((item: any) => {
      //   const route = router
      //     .getRoutes()
      //     .find((route: any) => route.name === item.name);
      //   if (!route) {
      //     router.addRoute('Layout', {
      //       path: item.path,
      //       name: item.name,
      //       component: () => import(`@/views${item.path}.vue`),
      //     });
      //   }
      // });
      console.log(router.getRoutes(), 'router.getRoutes');

      // setTimeout(() => {
      //   console.log(router, 'router.options.routes');
      //   console.log(router.hasRoute('User'), 'router.hasRoute');
      // }, 1000);
      // console.log(router, 'router.options.routes');
      // const asyncRoutes = router.options.routes.filter((item: any) => {
      //   if (item.path === '/permission') {
      //     item.children = item.children.filter((item: any) => {
      //       if (menusPermission.includes(item.path)) {
      //         return item;
      //       }
      //     });
      //   }
      //   if (menusPermission.includes(item.path)) {
      //     return item;
      //   }
      // });
      // router.addRoute(asyncRoutes);
      // console.log(router.options.routes);
    };

    // 用户退出
    const logout = async () => {
      user.value = {
        username: '',
        email: '',
      };
      token.value = '';
      window.location.href = '';
    };

    return {
      login,
      user,
      token,
      getUserInfo,
      logout,
    };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  },
);
