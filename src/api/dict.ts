const dict: any = {
  status: [
    { label: '启用', value: 1 },
    { label: '禁用', value: 2 },
  ],
};

function queryDict(key: string) {
  return new Promise((resolve) => {
    resolve(dict[key]);
  });
}

export default queryDict;
