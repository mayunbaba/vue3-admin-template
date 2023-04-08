<script lang="ts" setup>
import { useEditForm } from '@/hooks/editForm';
import api from '@/api';
import Table from '@/components/table.vue';
import rolesForm from './roles/rolesForm.vue';
// 表格需要数据
const tableRef = ref();
const searchFormInitData = {
  keyword: '',
};
const tableCloumns = [
  {
    label: '角色',
    prop: 'name',
  },
  {
    label: '备注',
    prop: 'remarks',
  },
  {
    label: '创建时间',
    prop: 'create_time',
  },
  {
    label: '更新时间',
    prop: 'update_time',
  },
  {
    fixed: 'right',
    type: 'operation',
  },
];

// 弹窗逻辑
const dialogFormInitData = {};
const {
  dialogVisible,
  dialogTitle,
  dialogOpreation,
  dialogForm,
  add,
  edit,
  view,
  submit,
  loadingDialog,
} = useEditForm({
  dialogFormInitData,
  addApi: api.roles.addRole,
  editApi: api.roles.updateRole,
  viewApi: api.roles.getRole,
  search: () => {
    tableRef.value.search();
  },
});
</script>

<template>
  <div>
    <Table
      :search-form-init-data="searchFormInitData"
      :query-api="api.roles.getRoles"
      :del-api="api.roles.deleteRole"
      :table-cloumns="tableCloumns"
      ref="tableRef"
      @add="add"
      @edit="edit"
      @view="view"
    >
    </Table>
    <!-- 查看、编辑、新增弹窗 -->
    <el-dialog v-model="dialogVisible" center :title="dialogTitle">
      <rolesForm
        v-model:dialog-visible="dialogVisible"
        :dialog-opreation="dialogOpreation"
        :dialog-form="dialogForm"
        :loading-dialog="loadingDialog"
        @submit="submit"
      />
    </el-dialog>
  </div>
</template>
