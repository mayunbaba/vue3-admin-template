import { request } from '@/utils';
import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';

export default defineStore(
  'userStore',
  () => {
    // state 修改state通过$patch
    const user: Ref<User> = ref({
      id: 0,
      username: '',
      email: '',
      provider: 'local',
      confirmed: true,
      blocked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const token = ref('');

    // Actions
    const login = async (data: LoginRequest) => {
      const res: LoginResponse = await request.post('/auth/local', data);
      if (!res) return;
      token.value = res.jwt;
      user.value = res.user;
      return res;
    };

    // 获取用户信息
    const getUserInfo = async () => {
      const res: User = await request.get('/users/me');
      if (!res) return;
      user.value = res;
    };

    return {
      login,
      user,
      token,
      getUserInfo,
    };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  },
);
