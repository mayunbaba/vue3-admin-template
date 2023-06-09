import request from '@/utils/request';

export default {
  // 登录
  login: (data: any) => request.post('/users/login', data),
  // 获取用户信息
  getUserInfo: () =>
    request('/users/info').then((res: any) => {
      const { menus } = res.data;
      menus.map((menu: any) => {
        menu.path = menu.route_path;
        menu.name = menu.route_name;
        menu.meta = {
          title: menu.title,
        };
      });
      return res;
    }),
  // 查询列表
  getUsers: async (searchForm: any, currentPage: any, pageSize: any) => {
    const res: any = await request('/users', {
      params: { page: currentPage, limit: pageSize, ...searchForm },
    });
    const { data } = res.data;
    data.forEach((item: any) => {
      const { roles } = item;
      item.roles = roles.map((role: any) => role.role_id);
    });
    return res;
  },
  // 新增
  addUser: (data: any) => request.post('/users', data),
  // 修改
  updateUser: (data: any) => request.put(`/users/${data.id}`, data),
  // 删除
  deleteUser: (datas: any) => {
    return request.delete(`/users/${datas[0].id}`);
  },
};
