import request from '@/utils/request';

export default {
  // 登录
  login: (data: any) => request.post('/users/login', data),
  // 获取用户信息
  getUserInfo: () => request('/users/info'),
  // 查询列表
  queryList: (searchForm: any, currentPage: any, pageSize: any) => {
    return request('/users', {
      params: { page: currentPage, limit: pageSize, ...searchForm },
    });
  },
  // 编辑和新增
  editAndAdd: (data: { id: any }, type: string) => {
    if (type === 'add') {
      return request.post('/users', data);
    } else {
      const id = data.id;
      return request.put(`/users/${id}`, data);
    }
  },
  // 删除
  deleteById: (id: string) => {
    return request(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};
