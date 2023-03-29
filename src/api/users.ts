import { beforeQueryList } from '@/api/utils/formatHttp';
import request from '@/utils/request';

// 登录
function login(data: any) {
  return request.post('/users/login', data);
}

// 获取用户信息
function getUserInfo() {
  return request('/users/info');
}

// 查询用户列表
function queryList(searchForm: any, currentPage: number, pageSize: number) {
  return request('/users', {
    params: { page: currentPage, limit: pageSize, ...searchForm },
  });
  // const filters = {
  //   username: {
  //     $contains: searchForm.username,
  //   },
  // };
  // return Promise.all([
  //   request('/users', beforeQueryList(filters, currentPage, pageSize)),
  //   request('/users/count'),
  // ]).then((resArr: any) => {
  //   const [data, total] = resArr;
  //   return {
  //     data,
  //     meta: {
  //       pagination: {
  //         page: currentPage,
  //         pageSize,
  //         total,
  //       },
  //     },
  //   };
  // });
}

// 新增或修改
function editAndAdd(data: any, type: string) {
  if (type === 'add') {
    delete data.id;
    data.confirmed = true;
    return request.post('/users', data);
  } else {
    const id = data.id;
    return request.put(`/users/${id}`, data);
  }
}

// 删除
function deleteById(id: string) {
  return request(`/users/${id}`, {
    method: 'DELETE',
  });
}

// 通过id获取用户信息
function viewById(id: string) {
  return request(`/users/${id}`);
}

export default {
  login,
  getUserInfo,
  queryList,
  editAndAdd,
  deleteById,
  viewById,
};
