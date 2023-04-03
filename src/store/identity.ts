import { defineStore } from 'pinia';
import users from '@/api/users';
import { listToTree } from '@/utils/common';
import router from '@/router';
import routesMap from '@/router/routesMap';

export default defineStore(
  'identityStore',
  () => {
    // state 修改state通过$patch
    const user = ref({
      username: '',
      email: '',
    });
    const permission = ref({
      menus: [],
      buttons: [],
    });
    const token = ref('');
    const treeMenu = ref();

    // Actions
    const login = async (data: any) => {
      const res: any = await users.login(data);
      token.value = res.data.token;
      // 防止用户使用上个账号的菜单权限
      await getUserInfo();
      return res;
    };

    // 获取用户信息
    const getUserInfo = async () => {
      const res: any = await users.getUserInfo();
      const menus = res.data.menus;
      user.value = res.data;
      // 菜单权限
      const menusPermission = menus
        .filter((item: any) => item.route_path)
        .map((item: any) => {
          return {
            ...item,
            path: item.route_path,
            name: item.route_name,
            meta: {
              title: item.title,
            },
          };
        });
      // 按钮权限
      const buttonsPermission = menus.filter((item: any) => !item.route_path);
      permission.value = {
        menus: menusPermission,
        buttons: buttonsPermission,
      };
      treeMenu.value = listToTree(permission.value.menus);
      // 添加路由
      treeMenu.value.forEach((route: any) => addRoute('Layout', route));
      console.log(router.getRoutes(), 'router.getRoutes()');
      console.log(router.options.routes, 'router.options.routes');
      return res;
    };

    function addRoute(parentName: string = 'Layout', route: any) {
      // 动态路由必须先添加父路由
      router.addRoute(parentName, {
        path: route.path,
        name: route.name,
        component: routesMap[route.path as '/dashboard'],
      });
      if (route.children) {
        route.children.forEach((item: any) => addRoute(route.name, item));
      }
    }

    const hasMenuPermission = (name: string) => {
      return permission.value.menus.some(
        (item: any) => item.route_name === name,
      );
    };

    // 用户退出
    const logout = async () => {
      user.value = {
        username: '',
        email: '',
      };
      token.value = '';
      permission.value = {
        menus: [],
        buttons: [],
      };
      window.location.href = '';
    };

    return {
      login,
      user,
      token,
      getUserInfo,
      logout,
      permission,
      hasMenuPermission,
      treeMenu,
    };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  },
);
