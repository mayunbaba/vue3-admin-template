import request from '@/utils/request';

// 角色列表
function getRoles() {
  return request('/roles');
}

// 新增或修改
function editAndAdd(data: any, type: string) {
  if (type === 'add') {
    delete data.id;
    return request.post('/users-permissions/roles', data);
  } else {
    const id = data.id;
    return request.put(`/users-permissions/roles/${id}`, data);
  }
}

// 删除
function deleteById(id: string) {
  return request(`/users-permissions/roles/${id}`, {
    method: 'DELETE',
  });
}

export default { getRoles, editAndAdd, deleteById };
