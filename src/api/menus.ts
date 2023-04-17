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
    return request(`/menus/${menu.id}`, {
      method: 'PUT',
      data: menu,
    });
  },
  // 更新菜单排序
  updateMenusSort: (menu: any) => {
    return request(`/menus/sort`, {
      method: 'POST',
      data: menu,
    });
  },
  // 删除菜单
  deleteMenus: (rows: any) => {
    return request(`/menus/${rows[0].id}`, {
      method: 'DELETE',
    });
  },
  // 获取菜单详情
  getMenu: (row: any) => {
    return request(`/menus/${row.id}`);
  },
};
