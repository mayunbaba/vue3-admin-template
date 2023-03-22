import axios from 'axios';
import { ElMessage } from 'element-plus';

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
    console.log(data.error.message);
    ElMessage.error(data.error.message);
  },
);

export default service;
