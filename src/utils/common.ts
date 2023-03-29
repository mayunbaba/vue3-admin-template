function getLabelByValue(options: any[], value: string) {
  if (!options || !options.length) return '';
  const option = options.find((item) => item.value === value);
  return option ? option.label : '';
}
export { getLabelByValue };
