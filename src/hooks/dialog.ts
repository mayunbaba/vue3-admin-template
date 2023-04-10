export function useDialog() {
  // 弹窗相关
  const dialog = reactive({
    visible: false,
    title: '',
    operation: '',
    loading: false,
    form: {},
  });

  function handleAdd() {
    dialog.title = '新增';
    dialog.operation = 'add';
    dialog.form = {};
    dialog.visible = true;
  }

  function handleEdit(row: any) {
    dialog.title = '编辑';
    dialog.operation = 'edit';
    dialog.form = { ...row };
    dialog.visible = true;
  }

  function handleView(row: any) {
    dialog.title = '查看';
    dialog.operation = 'view';
    dialog.form = { ...row };
    dialog.visible = true;
  }

  return {
    dialog,
    handleAdd,
    handleEdit,
    handleView,
  };
}
