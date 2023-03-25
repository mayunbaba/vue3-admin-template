import { formatResponseList } from '@/utils/formatRequest';
import request from '@/utils/request';

export function usePagination({
  url,
  searchForm,
}: {
  url: string;
  searchForm: any;
}) {
  // 分页相关
  const total = ref(0);
  const pageSize = ref(10);
  const currentPage = ref(1);
  const loading = ref(false);
  const tableData = ref();

  search();

  function search() {
    currentPage.value = 1;
    query();
  }

  function query() {
    if (loading.value) return;
    loading.value = true;
    request
      .get(url, {
        params: {
          filters: {
            name: {
              $contains: searchForm.name,
            },
            city: {
              $contains: searchForm.name,
            },
          },
          // populate: '*', // 不明白这个populate是干嘛的
          pagination: {
            page: currentPage.value,
            pageSize: pageSize.value,
            withCount: true,
          },
        },
      })
      .then((res: any) => {
        if (res) {
          formatResponseList(res.data);
          tableData.value = res.data;
          total.value = res.meta.pagination.total;
          pageSize.value = res.meta.pagination.pageSize;
          currentPage.value = res.meta.pagination.page;
        }
        loading.value = false;
      });
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
    tableData,
    total,
    pageSize,
    currentPage,
    loading,
    search,
    handleCurrentChange,
    handleSizeChange,
  };
}
