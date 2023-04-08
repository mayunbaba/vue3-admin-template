import { dialogTitleObj } from '@/utils/common';

export function useEditForm({
  dialogFormInitData,
  viewApi,
  addApi,
  editApi,
  delApi,
  search,
}: any) {
  const loading = ref(false);
  const dialogVisible = ref(false);
  const dialogOpreation = ref('add');
  const dialogForm = ref({
    ...dialogFormInitData,
  });
  const dialogTitle = computed(() => {
    return dialogTitleObj[dialogOpreation.value as 'add'];
  });
  function add() {
    dialogVisible.value = true;
    dialogOpreation.value = 'add';
    dialogForm.value = {
      ...dialogFormInitData,
    };
  }
  function del(row: any) {
    delApi(row).then((res: any) => {
      if (res) {
        search();
      }
    });
  }
  function edit(row: any) {
    dialogVisible.value = true;
    dialogOpreation.value = 'edit';
    getDetail(row);
  }
  function view(row: any) {
    dialogVisible.value = true;
    dialogOpreation.value = 'view';
    getDetail(row);
  }
  function submit() {
    if (loading.value) return;
    loading.value = true;
    addOrEdit()
      .then((res: any) => {
        if (res) {
          dialogVisible.value = false;
          search();
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }

  function addOrEdit() {
    if (dialogOpreation.value === 'add') {
      return addApi(dialogForm.value);
    } else {
      return editApi(dialogForm.value);
    }
  }

  function getDetail(row: any) {
    if (viewApi) {
      viewApi(row).then((res: any) => {
        dialogForm.value = res.data;
      });
    } else {
      dialogForm.value = { ...row };
    }
  }

  return {
    dialogVisible,
    dialogTitle,
    dialogOpreation,
    dialogForm,
    edit,
    view,
    add,
    del,
    submit,
    loadingDialog: loading,
  };
}
