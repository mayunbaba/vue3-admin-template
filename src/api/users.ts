import { beforeQueryList } from '@/api/utils/formatHttp';
import request from '@/utils/request';

// 登录
function login(data: any) {
  return request.post('/auth/local', data);
}

// 获取用户信息
function getUserInfo() {
  return request('/users/me');
}

// 查询列表
function queryList(searchForm: any, currentPage: number, pageSize: number) {
  // 定义查询规则
  const filters = {
    username: {
      $contains: searchForm.username,
    },
  };
  return request(
    '/users',
    // 格式化入参
    beforeQueryList(filters, currentPage, pageSize),
  ).then((res: any) => {
    return {
      data: res,
      meta: {
        pagination: {
          page: 1,
          pageSize: 10,
          total: 100,
        },
      },
    };
  });
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

export default {
  login,
  getUserInfo,
  queryList,
  editAndAdd,
  deleteById,
};
