export function useEditForm({
  dialogFormRef,
  dialogFormInit,
  editAndAdd,
  deleteById,
  search,
}: any) {
  const loading = ref(false);
  const dialogVisible = ref(false);
  const dialogTitle = ref('新增');
  const dialogOpreation = ref('add');
  const dialogForm = reactive({
    ...dialogFormInit,
  });
  function add() {
    dialogTitle.value = '新增';
    dialogVisible.value = true;
    dialogOpreation.value = 'add';
    dialogFormRef.value?.resetFields();
    Object.assign(dialogForm, {
      ...dialogFormInit,
    });
  }
  function del(row: any) {
    deleteById(row.id).then((res: any) => {
      if (res) {
        search();
      }
    });
  }
  function edit(row: any) {
    dialogTitle.value = '编辑';
    dialogVisible.value = true;
    dialogOpreation.value = 'edit';
    dialogFormRef.value?.resetFields();
    Object.assign(dialogForm, row);
  }
  function view(row: any) {
    dialogTitle.value = '查看';
    dialogVisible.value = true;
    dialogOpreation.value = 'view';
    dialogFormRef.value?.resetFields();
    Object.assign(dialogForm, row);
  }
  function submit() {
    dialogFormRef.value.validate((valid: boolean, fields: any) => {
      if (valid) {
        if (loading.value) return;
        loading.value = true;
        editAndAdd(dialogForm, dialogOpreation.value).then((res: any) => {
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
