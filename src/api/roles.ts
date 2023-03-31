import request from '@/utils/request';

export default {
  getRoles: (searchForm?: any, currentPage?: any, pageSize?: any) => {
    return request('/roles', {
      params: { page: currentPage, limit: pageSize, ...searchForm },
    });
  },
  addRole: (data: any) => request.post('/roles', data),
  updateRole: (data: any) => request.put(`/roles/${data.id}`, data),
  deleteRole: (data: any) => request.delete(`/roles/${data.id}`),
  getRole: (data: any) => request.get(`/roles/${data.id}`),
  getRoleMembers: (data: any) => request.get(`/roles/${data.id}/members`),
  addRoleMembers: (data: any) =>
    request.post(`/roles/${data.id}/members`, data),
  deleteRoleMembers: (data: any) =>
    request.delete(`/roles/${data.id}/members`, { data }),
  getRoleMenus: (data: any) => request.get(`/roles/${data.id}/menus`),
  updateRoleMenus: (data: any) => request.post(`/roles/${data.id}/menus`, data),
};
