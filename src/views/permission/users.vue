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
// 编辑、查看、新增
const dialogFormInitData = {
  status: 1,
};

const {
  dialogVisible,
  dialogTitle,
  dialogOpreation,
  dialogForm,
  add,
  del,
  edit,
  view,
  submit,
  loadingDialog,
} = useEditForm({
  dialogFormInitData,
  addApi: api.users.addUser,
  editApi: api.users.updateUser,
  delApi: api.users.deleteUser,
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
    :searchFormInitData="searchFormInitData"
    :queryApi="api.users.getUsers"
    :tableCloumns="tableCloumns"
    ref="tableRef"
    @add="add"
    @edit="edit"
    @view="view"
    @del="del"
  >
    <!-- 搜索框 -->
    <template #searchForm="{ searchForm }">
      <el-form-item label="关键字" prop="keyword">
        <el-input v-model="searchForm.keyword" />
      </el-form-item>
    </template>
    <!-- 新增按钮 -->
    <template #add>
      <el-button type="primary" @click="add">新增</el-button>
    </template>
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
      v-model:dialogVisible="dialogVisible"
      :dialogOpreation="dialogOpreation"
      :dialogForm="dialogForm"
      :loadingDialog="loadingDialog"
      @submit="submit"
    />
  </el-dialog>
</template>
