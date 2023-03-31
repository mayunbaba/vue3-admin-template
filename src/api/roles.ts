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
  getRole: (data: any) => {
    // 获取角色详情包含角色成员和角色菜单
    return Promise.all([
      request.get(`/roles/${data.id}`),
      request.get(`/roles/${data.id}/menus`),
    ]).then((res) => {
      const [role, menus] = res;
      if (role && menus) {
        const { data } = role;
        const { data: menuData } = menus;
        Object.assign(data, { menus: menuData });
        console.log(role);
        return role;
      }
    });
  },
  getRoleMembers: (data: any) => request.get(`/roles/${data.id}/members`),
  addRoleMembers: (data: any) =>
    request.post(`/roles/${data.id}/members`, data),
  deleteRoleMembers: (data: any) =>
    request.delete(`/roles/${data.id}/members`, { data }),
  getRoleMenus: (data: any) => request.get(`/roles/${data.id}/menus`),
  updateRoleMenus: (data: any) => request.post(`/roles/${data.id}/menus`, data),
};
