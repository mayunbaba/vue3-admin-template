import axios from 'axios';
import useUserStore from '@/stores/user';

const service = axios.create({
  baseURL: '/admin',
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
    const { code } = data;
    console.log('error', data);
    if (code === 40009) {
      console.log(data.msg, '请联系FE');
    }
    ElMessage.error(data.msg);
  },
);

export default service;
