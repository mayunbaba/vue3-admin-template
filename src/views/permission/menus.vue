<script lang="ts" setup>
import api from '@/api';
import Table from '@/components/table.vue';
import menusForm from './menus/menusForm.vue';
import sortMenus from './menus/sortMenus.vue';

// 表格需要数据
const tableRef = ref();
const searchFormInitData = {
  keyword: '',
};
const tableCloumns = [
  {
    label: '菜单名称',
    prop: 'title',
  },
  {
    label: '前端标识',
    prop: 'route_name',
  },
  {
    label: '权限类型',
    prop: 'type',
    width: 100,
  },
  {
    label: '隐藏',
    prop: 'hidden',
    width: 65,
  },
  {
    label: '前端路由',
    prop: 'route_path',
  },
  {
    label: '图标',
    prop: 'icon',
  },
  {
    label: '权限标识',
    prop: 'api_route_name',
  },
  {
    fixed: 'right',
    type: 'operation',
    width: 260,
  },
];
// =========================== 页面逻辑 ===========================
function handleSort() {
  const dialog = tableRef.value.dialog;
  dialog.uiType = 'drawer';
  dialog.title = '菜单排序';
  dialog.operation = 'sort';
  dialog.visible = true;
}

function handleAddSub(row: any) {
  const dialog = tableRef.value.dialog;
  dialog.uiType = 'dialog';
  dialog.title = '添加子菜单';
  dialog.operation = 'addSub';
  dialog.form.parent_id = row.id;
  dialog.visible = true;
}
</script>

<template>
  <div class="menus-page">
    <Table
      :search-form-init-data="searchFormInitData"
      :query-api="api.menus.getMenuTree"
      :del-api="api.menus.deleteMenus"
      :table-cloumns="tableCloumns"
      ref="tableRef"
    >
      <template #btnGroup>
        <el-button type="primary" @click="handleSort"> 排序 </el-button>
      </template>
      <template #type="{ row }">
        <el-tag v-if="row.type === 1" type="danger">菜单</el-tag>
        <el-tag v-else-if="row.type === 2" type="success">按钮</el-tag>
      </template>
      <template #hidden="{ row }">
        <div v-if="row.type === 1">
          <el-tag v-if="row.hidden === 1" type="danger">是</el-tag>
          <el-tag v-else-if="row.hidden === 0" type="success">否</el-tag>
        </div>
        <div v-else>--</div>
      </template>
      <template #operationBehind="{ row }">
        <el-button
          v-if="row.type === 1"
          type="primary"
          link
          @click="handleAddSub(row)"
          >添加子菜单</el-button
        >
      </template>
      <!-- 弹窗 -->
      <template #dialogContent="{ dialog, search, tableData }">
        <sortMenus
          v-if="dialog.operation === 'sort'"
          v-model="dialog.visible"
          :table-data="tableData"
          @after-submit="search"
        />
        <menusForm
          v-else
          v-model="dialog.visible"
          :operation="dialog.operation"
          :form="dialog.form"
          @afterSubmit="search"
        />
      </template>
    </Table>
  </div>
</template>
<style lang="scss">
.menus-page {
  .search-wrap {
    display: none;
  }
}
</style>
