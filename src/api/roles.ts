import request from '@/utils/request';

export default {
  // getRoles,
  getRoles: () => request('/roles'),
  // editAndAdd,
  editAndAdd: (data: any, type: string) => {
    if (type === 'add') {
      delete data.id;
      return request.post('/users-permissions/roles', data);
    } else {
      const id = data.id;
      return request.put(`/users-permissions/roles/${id}`, data);
    }
  },
  // deleteById,
  deleteById: (id: string) => {
    return request(`/users-permissions/roles/${id}`, {
      method: 'DELETE',
    });
  },
};
