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
      delete res.data.menus;
      user.value = res.data;
      permission.value.menus = menus.filter((item: any) => item.type === 1);
      permission.value.buttons = menus.filter((item: any) => item.type === 2);
      return res;
    };

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
      router.push('/login');
    };

    return {
      login,
      user,
      token,
      getUserInfo,
      logout,
      permission,
      hasMenuPermission,
    };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  },
);
