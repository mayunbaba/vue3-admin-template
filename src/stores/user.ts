import request from '@/utils/request';
import { defineStore } from 'pinia';

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
      const res: LoginResponse = await request.post('/api/auth/local', data);
      if (!res) return;
      token.value = res.jwt;
      user.value = res.user;
      return res;
    };

    // 获取用户信息
    const getUserInfo = async () => {
      const res: User = await request.get('/api/users/me');
      if (!res) return;
      user.value = res;
    };

    // 用户退出
    const logout = () => {
      user.value = {
        username: '',
        email: '',
      };
      token.value = '';
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
