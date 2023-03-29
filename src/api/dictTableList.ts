const dict: any = {
  status: [
    { label: '启用', value: 1 },
    { label: '禁用', value: 2 },
  ],
};

function dictTableList(key: string) {
  return dict[key];
}
export default dictTableList;
