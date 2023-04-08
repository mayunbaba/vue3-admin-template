export function usePagination({ searchFormInitData, queryApi, delApi }: any) {
  // 分页相关
  const total = ref(0);
  const pageSize = ref(10);
  const currentPage = ref(1);
  const loading = ref(false);
  const tableData = ref();
  const searchForm = ref({ ...searchFormInitData });

  search();

  function search() {
    currentPage.value = 1;
    query();
  }

  function query() {
    if (loading.value) return;
    loading.value = true;
    tableData.value = [];
    queryApi(searchForm.value, currentPage.value, pageSize.value)
      .then((res: any) => {
        if (res) {
          const { data } = res;
          if (data.data) {
            // 有分页
            tableData.value = data.data;
            total.value = data.total;
            pageSize.value = data.per_page;
            currentPage.value = data.current_page;
          } else {
            // 无分页
            tableData.value = data;
            total.value = 0;
          }
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }

  function del(row: any) {
    loading.value = true;
    delApi(row)
      .then((res: any) => {
        loading.value = false;
        if (res) {
          query();
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }

  function handleCurrentChange(page: number) {
    currentPage.value = page;
    query();
  }

  function handleSizeChange(size: number) {
    pageSize.value = size;
    query();
  }

  function reset() {
    searchForm.value = { ...searchFormInitData };
    search();
  }

  return {
    tableData,
    total,
    pageSize,
    currentPage,
    loading,
    search,
    del,
    handleCurrentChange,
    handleSizeChange,
    reset,
    searchForm,
  };
}
