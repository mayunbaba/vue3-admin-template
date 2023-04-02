import { defineStore } from 'pinia';
import users from '@/api/users';

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
      return res;
    };

    // 获取用户信息
    const getUserInfo = async () => {
      const res: any = await users.getUserInfo();
      const menus = res.data.menus;
      user.value = res.data;
      // 菜单权限
      const menusPermission = menus.filter((item: any) => item.route_path);
      // 按钮权限
      const buttonsPermission = menus.filter((item: any) => !item.route_path);
      permission.value = {
        menus: menusPermission,
        buttons: buttonsPermission,
      };
      return permission.value;
    };

    const setMenus = () => {
      const menus = permission.value.menus;
      const buttons = permission.value.buttons;
      const menusMap = new Map();
      menus.forEach((item: any) => {
        menusMap.set(item.id, item);
      });
      console.log(menusMap, '动态添加路由未开发');
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
      permission,
      setMenus,
    };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  },
);
