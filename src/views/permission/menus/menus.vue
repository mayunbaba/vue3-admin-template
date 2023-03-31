<script lang="ts" setup>
import ListPage from '@/components/listPage.vue';
import { usePagination } from '@/hooks/pagination';
import { useEditForm } from '@/hooks/editForm';
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

// 编辑、查看、新增
const dialogFormRef = ref();
const dialogFormInitData = {};
const dialogFormRules: any = reactive({
  name: [{ required: true, message: '请输入角色', trigger: 'blur' }],
  remarks: [{ required: true, message: '请输入备注', trigger: 'blur' }],
});
const {
  dialogVisible,
  dialogTitle,
  dialogOpreation,
  dialogForm,
  add,
  edit,
  view,
  submit,
  del,
  loadingDialog,
} = useEditForm({
  dialogFormRef,
  dialogFormInitData,
  addApi: api.roles.addRole,
  editApi: api.roles.updateRole,
  delApi: api.roles.deleteRole,
  viewApi: api.menus.getMenu,
  search,
});
// =========================== 页面逻辑 ===========================
</script>

<template>
  <ListPage>
    <template #add>
      <el-button type="primary" @click="add">新增</el-button>
    </template>
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
        <el-table-column prop="route_name" label="route_name" />
        <el-table-column prop="api_route_name" label="api_route_name" />
        <el-table-column prop="remarks" label="备注" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" link @click="edit(row)"> 编辑 </el-button>
            <el-button type="primary" link @click="view(row)"> 查看 </el-button>
            <el-popconfirm
              title="删除后将无法恢复，确定删除？"
              @confirm="del(row)"
            >
              <template #reference>
                <el-button type="danger" link>Delete</el-button>
              </template>
            </el-popconfirm>
          </template>
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
    <!-- 查看、编辑、新增弹窗 -->
    <el-dialog v-model="dialogVisible" center :title="dialogTitle">
      <el-form
        ref="dialogFormRef"
        :model="dialogForm"
        label-width="80px"
        :rules="dialogFormRules"
        :disabled="dialogOpreation.includes('view')"
      >
        <el-form-item label="角色" prop="username">
          <el-input v-model="dialogForm.name" placeholder="" clearable />
        </el-form-item>
        <el-form-item label="备注" prop="nickname">
          <el-input v-model="dialogForm.remarks" placeholder="" clearable />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
        v-if="!dialogOpreation.includes('view')"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="loadingDialog" @click="submit">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </ListPage>
</template>
