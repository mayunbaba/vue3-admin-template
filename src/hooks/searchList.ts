import request from '@/utils/request';

export function useSearchList({ url }: { url: string }) {
  // 分页相关
  const total = ref(0);
  const pageSize = ref(10);
  const currentPage = ref(1);
  const loading = ref(false);
  const list = ref();

  search();

  function search() {
    currentPage.value = 1;
    query();
  }
  async function query() {
    loading.value = true;
    const res = await request.get(url, {
      params: {
        filters: {
          // username: {
          //   $contains: searchForm.username,
          // },
        },
        // populate: '*', // 不明白这个populate是干嘛的
        // pagination: {
        //   page: currentPage.value,
        //   pageSize: pageSize.value,
        //   withCount: true,
        // },
      },
    });
    list.value = res;
    console.log('res', list.value);
    // total.value = res.meta.pagination.total;
    // pageSize.value = res.meta.pagination.pageSize;
    // currentPage.value = res.meta.pagination.page;
    loading.value = false;
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

  return {
    list: list.value,
    total: total.value,
    pageSize: pageSize.value,
    currentPage: currentPage.value,
    loading: loading.value,
    search,
    handleCurrentChange,
    handleSizeChange,
  };
}
