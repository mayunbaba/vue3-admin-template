<script lang="ts" setup>
import listPage from '@/layout/listPage.vue';
import { usePagination } from '@/hooks/pagination';
import { useEditForm } from '@/hooks/editForm';
import users from '@/api/users';
import roles from '@/api/roles';

// 查询
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
  queryList: users.queryList,
});

// 编辑、查看、新增
const dialogFormRef = ref();
const rulesDialogForm: any = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      min: 4,
      max: 20,
      message: '用户名长度在 4 到 20 个字符',
      trigger: 'blur',
    },
  ],
  // email: [
  //   { required: true, message: '请输入邮箱', trigger: 'blur' },
  //   { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
  // ],
  // role: [{ required: true, message: '请输入角色', trigger: 'blur' }],
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
} = useEditForm({
  dialogFormRef,
  editAndAdd: users.editAndAdd,
  deleteById: users.deleteById,
  search,
});
// =========================== 页面逻辑 ===========================
const rolesOptions = ref();
getRoles();
async function getRoles() {
  const res: any = await roles.getRoles();
  if (!res) return;
  rolesOptions.value = res.roles.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
}
</script>

<template>
  <list-page>
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
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="nickname" label="昵称" />
        <el-table-column prop="mobile" label="手机号" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="status" label="状态" />
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
        :rules="rulesDialogForm"
        :disabled="dialogOpreation.includes('view')"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="dialogForm.username" placeholder="" clearable />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="dialogForm.nickname" placeholder="" clearable />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="dialogForm.mobile" placeholder="" clearable />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="dialogForm.email" placeholder="" clearable />
        </el-form-item>
        <el-form-item label="启用状态" prop="status">
          <el-input v-model="dialogForm.status" placeholder="" clearable />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="dialogForm.role">
            <el-option
              v-for="item in rolesOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
  </list-page>
</template>
