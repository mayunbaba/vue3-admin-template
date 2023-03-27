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
    '/api/scenics',
    // 格式化入参
    formatRequestList(filters, currentPage, pageSize),
  ).then((res: any) => {
    // 格式化出参
    if (res) formatResponseList(res.data);
    return res;
  });
}

// 新增或修改
function editAndAdd(params: any, type: string) {
  if (typeof params.city === 'object') {
    params.province = params.city[0];
    params.city = params.city[1];
  }
  return insertOrUpdateRequest('/api/scenics', params, type);
}

// 删除
function deleteById(id: string) {
  return request(`/api/scenics/${id}`, {
    method: 'DELETE',
  });
}

export default {
  queryList,
  editAndAdd,
  deleteById,
};
