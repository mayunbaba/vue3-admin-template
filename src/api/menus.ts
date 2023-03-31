import request from '@/utils/request';

export default {
  // 获取菜单树
  getMenuTree: () => {
    return request('/menus/tree');
  },
  // 新增菜单
  addMenus: (menu: any) => {
    return request('/menus', {
      method: 'POST',
      data: menu,
    });
  },
  // 更新菜单
  updateMenus: (menu: any) => {
    return request('/menus', {
      method: 'PUT',
      data: menu,
    });
  },
  // 删除菜单
  deleteMenus: (id: any) => {
    return request(`/menus/${id}`, {
      method: 'DELETE',
    });
  },
  // 获取菜单详情
  getMenu: (row: any) => {
    return request(`/menus/${row.id}`);
  },
};
