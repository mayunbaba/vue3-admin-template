<script lang="ts" setup>
import { usePagination } from '@/hooks/pagination';

const props = defineProps<{
  searchFormInitData: any;
  queryApi: any;
  delApi: any;
  tableCloumns: any;
}>(); // 传入的参数

// 编辑、查看、新增
const emits = defineEmits(['add', 'view', 'edit']);

// 查询
const {
  tableData,
  total,
  pageSize,
  currentPage,
  loading,
  search,
  del,
  handleCurrentChange,
  handleSizeChange,
  reset,
  searchForm,
} = usePagination({
  searchFormInitData: props.searchFormInitData,
  queryApi: props.queryApi,
  delApi: props.delApi,
});

function formatTableValue(val: any) {
  if (val === null || val === undefined || val.length === 0) {
    return '--';
  } else {
    return val;
  }
}

defineExpose({
  search,
});
</script>

<template>
  <div class="list-page">
    <el-form :inline="true" :model="searchForm" class="search-wrap">
      <slot name="searchForm" :searchForm="searchForm">
        <el-form-item label="" prop="keyword">
          <el-input v-model="searchForm.keyword" />
        </el-form-item>
      </slot>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="table-wrap">
      <slot name="add">
        <el-button type="primary" @click="emits('add')">新增</el-button>
      </slot>
      <el-table
        :data="tableData"
        border
        v-loading="loading"
        element-loading-text="Loading..."
        element-loading-background="rgba(122, 122, 122, 0.8)"
      >
        <template v-for="cloumn in tableCloumns">
          <el-table-column
            v-if="cloumn.type === 'selection'"
            type="selection"
          ></el-table-column>
          <el-table-column
            v-else-if="cloumn.type === 'index'"
            type="index"
            :index="cloumn.index"
          ></el-table-column>
          <el-table-column
            v-else-if="cloumn.type === 'expand'"
            type="expand"
            :expandPannel="cloumn.expandPannel"
          ></el-table-column>
          <el-table-column
            v-else-if="cloumn.type === 'operation'"
            label="操作"
            :width="cloumn.width"
            :fixed="cloumn.fixed"
          >
            <template #default="{ row }">
              <slot name="operation" :row="row">
                <el-button type="primary" link @click="emits('edit', row)">
                  编辑
                </el-button>
                <el-button type="primary" link @click="emits('view', row)">
                  查看
                </el-button>
                <el-popconfirm
                  title="删除后将无法恢复，确定删除？"
                  @confirm="del(row)"
                >
                  <template #reference>
                    <el-button type="danger" link>Delete</el-button>
                  </template>
                </el-popconfirm>
              </slot>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :prop="cloumn.prop"
            :label="cloumn.label"
            :width="cloumn.width"
            :formatter="cloumn.formatter"
            :fixed="cloumn.fixed"
          >
            <template #default="{ row }">
              <!-- 插槽带默认内容，传入内容可以被替换 -->
              <slot :name="cloumn.prop" :row="row">
                <span>{{ formatTableValue(row[cloumn.prop]) }}</span>
              </slot>
            </template>
          </el-table-column>
        </template>
        <!-- 目前这个插槽还未启用，组件实在不满足需求的情况下启用，不到万不得已不使用 -->
        <slot name="tableBehind"></slot>
      </el-table>
    </div>
    <el-pagination
      v-if="total > 0"
      class="pagination-wrap"
      layout="prev, pager, next, sizes, ->, total"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="total"
      :disabled="loading"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
