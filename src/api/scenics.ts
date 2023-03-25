import {
  formatRequestList,
  formatResponseList,
  insertOrUpdateRequest,
} from '@/utils/formatHttp';
import request from '@/utils/request';

// 查询列表
function queryList(searchForm: any, currentPage: number, pageSize: number) {
  // 定义查询规则
  const filters = {
    name: {
      $contains: searchForm.name,
    },
    province: {
      $eq: searchForm.city[0],
    },
    city: {
      $eq: searchForm.city[1],
    },
  };
  return request(
    '/scenics',
    // 格式化入参
    formatRequestList(filters, currentPage, pageSize),
  ).then((res: any) => {
    // 格式化出参
    if (res) formatResponseList(res.data);
    return res;
  });
}

// 新增或修改
function updateOrCreate(params: any, type: string) {
  const data = {
    ...params,
    province: params.city[0],
    city: params.city[1],
  };
  return insertOrUpdateRequest('/scenics', data, type);
}

export default {
  queryList,
  updateOrCreate,
};
