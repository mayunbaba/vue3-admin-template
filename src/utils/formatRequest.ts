import request from './request';

function formatResponseList(list: any[]) {
  list.forEach((item) => {
    Object.assign(item, item.attributes);
    delete item.attributes;
  });
}

function insertOrUpdateRequest(url: string, data: any, type: string) {
  const id = data.id;
  delete data.id;
  // 删除空字符串 strapi的规定
  Object.keys(data).forEach((key) => {
    if (data[key].trim() === '') {
      delete data[key];
    }
  });
  if (type === 'add') {
    return request.post(url, { data });
  } else {
    return request.put(`${url}/${id}`, { data });
  }
}

export { formatResponseList, insertOrUpdateRequest };
