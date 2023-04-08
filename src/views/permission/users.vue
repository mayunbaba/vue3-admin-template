<script lang="ts" setup>
import api from '@/api';
import { useEditForm } from '@/hooks/editForm';
import { getLabelByValue } from '@/utils/common';
import Table from '@/components/table.vue';
import usersForm from './users/usersForm.vue';
// 表格需要数据
const tableRef = ref();
const searchFormInitData = {
  keyword: '',
};
const tableCloumns = [
  {
    label: '用户名',
    prop: 'username',
  },
  {
    label: '昵称',
    prop: 'nickname',
  },
  {
    label: '手机号',
    prop: 'mobile',
  },
  {
    label: '邮箱',
    prop: 'email',
  },
  {
    label: '状态',
    prop: 'status',
  },
  {
    label: '角色',
    prop: 'roles',
  },
  {
    fixed: 'right',
    type: 'operation',
  },
];
// 弹窗逻辑
const dialogFormInitData = {
  status: 1,
  roles: [],
};

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
  addApi: api.users.addUser,
  editApi: api.users.updateUser,
  search: () => {
    tableRef.value.search();
  },
});
// =========================== 页面逻辑 ===========================
// 字典
const rolesOptions = ref();
const statusOptions = ref();
api.roles.getRoles().then((res) => {
  const { data } = res.data;
  rolesOptions.value = data.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
});
api.dict('status').then((res) => {
  statusOptions.value = res;
});
</script>

<template>
  <Table
    :search-form-init-data="searchFormInitData"
    :query-api="api.users.getUsers"
    :del-api="api.users.deleteUser"
    :table-cloumns="tableCloumns"
    ref="tableRef"
    @add="add"
    @edit="edit"
    @view="view"
  >
    <!-- 替换默认内容 -->
    <template #status="{ row }">
      <el-tag
        :type="row.status === 1 ? 'success' : 'danger'"
        v-text="getLabelByValue(statusOptions, row.status)"
      />
    </template>
    <template #roles="{ row }">
      <el-tag
        v-for="item in row.roles"
        :key="item"
        v-text="getLabelByValue(rolesOptions, item)"
      >
      </el-tag>
    </template>
  </Table>
  <!-- 查看、编辑、新增弹窗 -->
  <el-dialog v-model="dialogVisible" center :title="dialogTitle + '用户'">
    <usersForm
      v-model:dialog-visible="dialogVisible"
      :dialog-opreation="dialogOpreation"
      :dialog-form="dialogForm"
      :loading-dialog="loadingDialog"
      @submit="submit"
    />
  </el-dialog>
</template>
