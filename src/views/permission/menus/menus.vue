<script lang="ts" setup>
import ListPage from '@/components/listPage.vue';
import { usePagination } from '@/hooks/pagination';
import api from '@/api';
// 查询
const searchFormInitData = {
  keyword: '',
};
const {
  tableData,
  total,
  pageSize,
  currentPage,
  loading,
  search,
  handleCurrentChange,
  handleSizeChange,
  reset,
  searchForm,
} = usePagination({
  searchFormInitData,
  queryApi: api.menus.getMenuTree,
});
// =========================== 页面逻辑 ===========================
</script>

<template>
  <ListPage>
    <template #searchForm>
      <el-form :inline="true" :model="searchForm">
        <el-form-item prop="keyword">
          <el-input v-model="searchForm.keyword" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #table>
      <el-table
        :data="tableData"
        border
        v-loading="loading"
        element-loading-text="Loading..."
        element-loading-background="rgba(122, 122, 122, 0.8)"
        row-key="id"
        default-expand-all
      >
        <!-- <el-table-column prop="id" width="50" /> -->
        <el-table-column type="selection" width="55" />
        <el-table-column prop="title" label="菜单名称" />
        <el-table-column prop="route_name" label="routeName" />
        <el-table-column prop="api_route_name" label="apiRouteName" />
        <el-table-column prop="hidden" label="hide" />
        <el-table-column prop="icon" label="icon" />
        <el-table-column label="操作">
          <!-- <template #default="{ row }">
            <el-popconfirm
              title="删除后将无法恢复，确定删除？"
              @confirm="del(row)"
            >
              <template #reference>
                <el-button type="danger" link>Delete</el-button>
              </template>
            </el-popconfirm>
          </template> -->
        </el-table-column>
      </el-table>
    </template>
    <template #pagination>
      <el-pagination
        v-if="total > 0"
        layout="prev, pager, next, sizes, ->, total"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :disabled="loading"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </ListPage>
</template>
