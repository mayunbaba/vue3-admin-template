import axios from 'axios';

const service = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use((config) => {
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
