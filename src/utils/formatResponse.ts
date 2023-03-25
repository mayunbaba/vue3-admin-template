function formatResponseList(list: any[]) {
  list.forEach((item) => {
    Object.assign(item, item.attributes);
    delete item.attributes;
  });
}

export { formatResponseList };
