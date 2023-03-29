function getLabelByValue(options: any[], value: string) {
  const option = options.find((item) => item.value === value);
  return option ? option.label : '';
}
export { getLabelByValue };
