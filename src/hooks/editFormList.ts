import { insertOrUpdateRequest } from '@/utils/formatRequest';

export function useEditFormList({
  url,
  dialogFormRef,
  dialogFormInit,
  search,
}: any) {
  const loading = ref(false);
  const dialogVisible = ref(false);
  const dialogTitle = ref('新增');
  const dialogOpreation = ref('add');
  const dialogForm = reactive({
    ...dialogFormInit,
  });

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
  function add() {
    dialogTitle.value = '新增';
    dialogVisible.value = true;
    dialogOpreation.value = 'add';
    dialogFormRef.value?.resetFields();
    Object.assign(dialogForm, {
      ...dialogFormInit,
    });
  }
  function submit() {
    dialogFormRef.value.validate((valid: boolean, fields: any) => {
      if (valid) {
        if (loading.value) return;
        loading.value = true;
        insertOrUpdateRequest(url, dialogForm, dialogOpreation.value).then(
          (res) => {
            loading.value = false;
            if (res) {
              dialogVisible.value = false;
              search();
            }
          },
        );
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
    submit,
    loading,
  };
}
