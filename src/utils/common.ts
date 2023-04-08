function getLabelByValue(options: any[], value: string) {
  if (!options || !options.length) return '';
  const option = options.find((item) => item.value === value);
  return option ? option.label : '';
}

const dialogTitleObj = {
  add: '新增',
  edit: '编辑',
  view: '查看',
};

export { getLabelByValue, dialogTitleObj };
