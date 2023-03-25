export function usePagination({ searchFormInit, queryList }: any) {
  // 分页相关
  const total = ref(0);
  const pageSize = ref(10);
  const currentPage = ref(1);
  const loading = ref(false);
  const tableData = ref();
  const searchForm = reactive({
    ...searchFormInit,
  });

  search();

  function search() {
    currentPage.value = 1;
    query();
  }

  function query() {
    if (loading.value) return;
    loading.value = true;
    queryList(searchForm, currentPage.value, pageSize.value).then(
      (res: any) => {
        if (res) {
          tableData.value = res.data;
          total.value = res.meta.pagination.total;
          pageSize.value = res.meta.pagination.pageSize;
          currentPage.value = res.meta.pagination.page;
        }
        loading.value = false;
      },
    );
  }

  function handleCurrentChange(page: number) {
    console.log('handleCurrentChange', page);
    currentPage.value = page;
    query();
  }

  function handleSizeChange(size: number) {
    pageSize.value = size;
    query();
  }

  function reset() {
    Object.assign(searchForm, {
      ...searchFormInit,
    });
    search();
  }

  return {
    tableData,
    total,
    pageSize,
    currentPage,
    loading,
    search,
    handleCurrentChange,
    handleSizeChange,
    reset,
    searchForm,
  };
}
