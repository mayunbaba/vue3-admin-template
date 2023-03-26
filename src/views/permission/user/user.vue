<script lang="ts" setup>
import { usePagination } from '@/hooks/pagination';
import { useEditFormList } from '@/hooks/editFormList';
import users from '@/api/users';

// 查询 ===================
const searchFormInit = {
  username: '',
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
  searchFormInit,
  queryList: users.queryList,
});

// 编辑、查看、新增
const dialogFormRef = ref();
const dialogFormInit = {
  id: '',
  username: '',
  email: '',
};
const rulesDialogForm = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  role: [{ required: true, message: '请输入角色', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },
  ],
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
} = useEditFormList({
  dialogFormRef,
  dialogFormInit,
  editAndAdd: users.editAndAdd,
  deleteById: users.deleteById,
  search,
});
</script>

<template>
  <div class="page-container">
    <!-- 搜索 -->
    <el-form :inline="true" :model="searchForm" class="area-wrap search-from">
      <el-form-item label="用户名">
        <el-input v-model="searchForm.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 功能区 -->
    <div class="flex">
      <el-button type="primary" class="last-one" @click="add">新增</el-button>
    </div>
    <!-- 表格 -->
    <div
      class="area-wrap"
      v-loading="loading"
      element-loading-text="Loading..."
      element-loading-background="rgba(122, 122, 122, 0.8)"
    >
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="用户ID" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="email" label="邮箱" />
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
    <!-- 查看、编辑、新增弹窗 -->
    <el-dialog v-model="dialogVisible" center :title="dialogTitle">
      <el-form
        ref="dialogFormRef"
        :model="dialogForm"
        label-width="80px"
        :rules="rulesDialogForm"
        :disabled="dialogOpreation.includes('view')"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="dialogForm.username" placeholder="" clearable />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="dialogForm.email" placeholder="" clearable />
        </el-form-item>
        <el-form-item
          label="角色"
          v-if="dialogOpreation.includes('add')"
          prop="role"
        >
          <el-input v-model="dialogForm.role" placeholder="" clearable />
        </el-form-item>
        <el-form-item
          label="密码"
          v-if="dialogOpreation.includes('add')"
          prop="password"
        >
          <el-input v-model="dialogForm.password" placeholder="" clearable />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
        v-if="!dialogTitle.includes('查看')"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="loadingDialog" @click="submit">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
