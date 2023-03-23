import axios from 'axios';
import useUserStore from '@/stores/user';

const service = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use((config) => {
  const userStore = useUserStore();
  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`;
  }
  return config;
});

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    const { data } = error.response;
    ElMessage.error(data.error.message);
  },
);

export default service;
