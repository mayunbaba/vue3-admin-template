<script lang="ts" setup>
import request from '@/utils/request';

const searchForm = reactive({
  username: '',
});
// 分页相关
const total = ref(0);
const pageSize = ref(10);
const currentPage = ref(1);
const loading = ref(false);
const list = ref();

search();

function search() {
  currentPage.value = 1;
  query();
}
async function query() {
  loading.value = true;
  // 此接口不支持分页
  const res = await request.get('/users', {
    params: {
      filters: {
        username: {
          $contains: searchForm.username,
        },
      },
      // populate: '*', // 不明白这个populate是干嘛的
      // users表分页不能用这个, 原因不详
      // pagination: {
      //   page: currentPage.value,
      //   pageSize: pageSize.value,
      //   withCount: true,
      // },
    },
  });
  list.value = res;
  loading.value = false;
}

function handleCurrentChange(page: number) {
  console.log('handleCurrentChange', page);
  currentPage.value = page;
  query();
}

function handleSizeChange(size: number) {
  pageSize.value = size;
  query();
}
</script>

<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchForm" class="search-form">
      <el-form-item label="">
        <el-input v-model="searchForm.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      style="width: 100%"
      :default-sort="{ prop: 'id', order: 'ascending' }"
    >
      <el-table-column prop="id" label="用户ID" sortable />
      <el-table-column prop="username" label="用户名" sortable />
      <el-table-column prop="email" label="邮箱" sortable />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="total > 0"
      class="pagination"
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
