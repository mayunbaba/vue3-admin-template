<script lang="ts" setup>
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
</script>

<template>
  <div>
    <Table
      :search-form-init-data="searchFormInitData"
      :query-api="api.roles.getRoles"
      :del-api="api.roles.deleteRole"
      :table-cloumns="tableCloumns"
      ref="tableRef"
    >
      <!-- 查看、编辑、新增弹窗 -->
      <template #dialogContent="{ dialog, search }">
        <rolesForm
          v-model="dialog.visible"
          :operation="dialog.operation"
          :form="dialog.form"
          @afterSubmit="search"
        />
      </template>
    </Table>
  </div>
</template>
