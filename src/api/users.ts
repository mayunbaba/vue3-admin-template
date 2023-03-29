import request from '@/utils/request';

class Users {
  // 登录
  login(data: any) {
    return request.post('/users/login', data);
  }
  // 获取用户信息
  getUserInfo() {
    return request('/users/info');
  }
  // 获取用户列表
  queryList(searchForm: any, currentPage: number, pageSize: number) {
    return request('/users', {
      params: { page: currentPage, limit: pageSize, ...searchForm },
    });
  }
  // 新增或编辑用户
  editAndAdd(data: any, type: string) {
    if (type === 'add') {
      return request.post('/users', data);
    } else {
      const id = data.id;
      return request.put(`/users/${id}`, data);
    }
  }
  // 删除用户
  deleteById(id: string) {
    return request(`/users/${id}`, {
      method: 'DELETE',
    });
  }
}

export default new Users();
