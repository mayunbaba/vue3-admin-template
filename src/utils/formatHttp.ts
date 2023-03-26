import request from './request';

// 这里的格式化入参和出参是为了适配strapi的接口
function formatRequestList(
  filters: any,
  currentPage: number,
  pageSize: number,
) {
  return {
    params: {
      sort: ['updatedAt:desc'],
      filters,
      // populate: '*', // 不明白这个populate是干嘛的
      pagination: {
        page: currentPage,
        pageSize: pageSize,
        withCount: true,
      },
    },
  };
}

function formatResponseList(list: any[]) {
  if (!list) return;
  list.forEach((item) => {
    Object.assign(item, item.attributes);
    delete item.attributes;
  });
}

function insertOrUpdateRequest(url: string, data: any, type: string) {
  const id = data.id;
  if (type === 'add') {
    data.id = null;
    return request.post(url, { data });
  } else {
    return request.put(`${url}/${id}`, { data });
  }
}

export { formatResponseList, insertOrUpdateRequest, formatRequestList };
