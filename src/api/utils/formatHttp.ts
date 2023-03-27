import request from '@/utils/request';

// 这里的格式化入参和出参是为了适配strapi的接口
function beforeQueryList(filters: any, currentPage: number, pageSize: number) {
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

function afterQueryList(list: any[]) {
  if (!list) return;
  list.forEach((item) => {
    Object.assign(item, item.attributes);
    delete item.attributes;
  });
}

function queryListFactory(
  url: string,
  filters: any,
  currentPage: number,
  pageSize: number,
) {
  return request(
    url,
    // 格式化入参
    beforeQueryList(filters, currentPage, pageSize),
  ).then((res: any) => {
    // 格式化出参
    if (res) afterQueryList(res.data);
    return res;
  });
}

function insertOrUpdateFactory(url: string, data: any, type: string) {
  if (type === 'add') {
    delete data.id;
    return request.post(url, { data });
  } else {
    const id = data.id;
    return request.put(`${url}/${id}`, { data });
  }
}

export {
  afterQueryList,
  insertOrUpdateFactory,
  beforeQueryList,
  queryListFactory,
};
