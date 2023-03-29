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
    config.headers.Authorization = userStore.token;
  }
  return config;
});

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 200 为成功状态码，只返回正常的数据，凡是报错都是reject
    const res = response.data;
    return res;
  },
  (error) => {
    // 账号密码不匹配、缺少必填项、账号已存在之类的错误，直接返回错误信息
    const { data } = error.response;
    const { code } = data;
    console.log('error', data);
    if (code === 40009) {
      console.log(data.msg, '请联系FE');
    }
    ElMessage.error(data.msg);
    // 业务逻辑中可以不处理错误，直接返回错误信息
    return Promise.reject(error);
  },
);

export default service;
