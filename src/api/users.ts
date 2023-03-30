// login: 用户登录
// getUserInfo: 获取用户信息
// queryList: 获取用户列表
// editAndAdd: 新增或编辑用户
// deleteById: 删除用户

import request from '@/utils/request';

function login(data: any) {
  return request.post('/users/login', data);
}

function getUserInfo() {
  return request('/users/info');
}

function queryList(searchForm: any, currentPage: any, pageSize: any) {
  return request('/users', {
    params: { page: currentPage, limit: pageSize, ...searchForm },
  });
}

function editAndAdd(data: { id: any }, type: string) {
  if (type === 'add') {
    return request.post('/users', data);
  } else {
    const id = data.id;
    return request.put(`/users/${id}`, data);
  }
}

function deleteById(id: string) {
  return request(`/users/${id}`, {
    method: 'DELETE',
  });
}

export default { login, getUserInfo, queryList, editAndAdd, deleteById };
