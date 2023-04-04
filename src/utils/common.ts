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

function updateTreeAttrs(tree: any[], attrs: string | number, value: any) {
  tree.forEach((item: any) => {
    item[attrs] = value;
    if (item.children) {
      updateTreeAttrs(item.children, attrs, value);
    }
  });
}

function treeToList(tree: any[]) {
  const list: any[] = [];
  tree.forEach((item: any) => {
    list.push(item);
    if (item.children) {
      list.push(...treeToList(item.children));
    }
  });
  return list;
}

export { getLabelByValue, dialogTitleObj, updateTreeAttrs, treeToList };
