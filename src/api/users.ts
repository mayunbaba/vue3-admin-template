import request from '@/utils/request';

export default {
  // 登录
  login: (data: any) => request.post('/users/login', data),
  // 获取用户信息
  getUserInfo: () => request('/users/info'),
  // 查询列表
  getUsers: (searchForm: any, currentPage: any, pageSize: any) => {
    return request('/users', {
      params: { page: currentPage, limit: pageSize, ...searchForm },
    });
  },
  // 新增
  addUser: (data: any) => request.post('/users', data),
  // 修改
  updateUser: (id: number, data: any) => request.put(`/users/${id}`, data),
  // 删除
  deleteUser: (id: number) => request.delete(`/users/${id}`),
};
