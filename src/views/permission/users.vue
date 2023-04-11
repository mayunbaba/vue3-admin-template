<script lang="ts" setup>
import api from '@/api';
import { getLabelByValue } from '@/utils/common';
import Table from '@/components/table.vue';
import usersForm from './users/usersForm.vue';

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
api.dict('status').then((res: any) => {
  statusOptions.value = res.map((item: any) => {
    return {
      label: item.label,
      value: item.value,
    };
  });
});

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
    filters: statusOptions,
  },
  {
    label: '角色',
    prop: 'roles',
    filters: rolesOptions,
  },
  {
    fixed: 'right',
    type: 'operation',
    width: 180,
  },
];
</script>

<template>
  <Table
    :search-form-init-data="searchFormInitData"
    :query-api="api.users.getUsers"
    :del-api="api.users.deleteUser"
    :table-cloumns="tableCloumns"
    ref="tableRef"
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
    <template #dialogContent="{ dialog, search }">
      <usersForm
        v-model="dialog.visible"
        :operation="dialog.operation"
        :form="dialog.form"
        @afterSubmit="search"
      />
    </template>
  </Table>
</template>
