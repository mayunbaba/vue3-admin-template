import request from '@/utils/request';
import { defineStore } from 'pinia';
import users from '@/api/users';

export default defineStore(
  'userStore',
  () => {
    // state 修改state通过$patch
    const user: Ref<User> = ref({
      username: '',
      email: '',
    });
    const token = ref('');

    // Actions
    const login = async (data: LoginRequest) => {
      const res: LoginResponse = await users.login(data);
      if (!res) return;
      token.value = res.jwt;
      user.value = res.user;
      return res;
    };

    // 获取用户信息
    const getUserInfo = async () => {
      const res: User = await users.getUserInfo();
      if (!res) return;
      user.value = res;
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
