import { dialogTitleObj } from '@/utils/common';

export function useEditForm({
  dialogFormRef,
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
    dialogFormRef.value?.resetFields();
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
    dialogFormRef.value?.resetFields();
    getDetail(row);
  }
  function view(row: any) {
    dialogVisible.value = true;
    dialogOpreation.value = 'view';
    dialogFormRef.value?.resetFields();
    getDetail(row);
  }
  function submit() {
    dialogFormRef.value.validate((valid: boolean, fields: any) => {
      if (valid) {
        if (loading.value) return;
        loading.value = true;
        addOrEdit().then((res: any) => {
          loading.value = false;
          if (res) {
            dialogVisible.value = false;
            search();
          }
        });
      } else {
        console.log('error submit!', fields);
      }
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
