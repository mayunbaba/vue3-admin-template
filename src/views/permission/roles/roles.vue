<script lang="ts" setup>
import ListPage from '@/components/listPage.vue';
import { usePagination } from '@/hooks/pagination';
import { useEditForm } from '@/hooks/editForm';
import api from '@/api';
import { updateTreeAttrs } from '@/utils/common';
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
  queryApi: api.roles.getRoles,
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
  viewApi: api.roles.getRole,
  search,
});
// =========================== 页面逻辑 ===========================
// 获取菜单树
const menuTree = ref([]);
const menuTreeRef = ref();
const defaultProps = {
  children: 'children',
  label: 'title',
  disabled: 'disabled',
};
api.menus.getMenuTree().then((res) => {
  menuTree.value = res.data;
});
function hanldeEdit(row: any) {
  edit(row);
  updateTreeAttrs(menuTree.value, 'disabled', false);
  api.roles.getRoleMenus(row).then((res) => {
    const roleMenus = res.data;
    menuTreeRef.value.setCheckedNodes(roleMenus);
  });
}
function handleView(row: any) {
  view(row);
  // 禁用menuTree所有节点
  updateTreeAttrs(menuTree.value, 'disabled', true);
  api.roles.getRoleMenus(row).then((res) => {
    const roleMenus = res.data;
    menuTreeRef.value.setCheckedNodes(roleMenus);
  });
}

function handleSubmit() {
  const checkedNodes = menuTreeRef.value.getCheckedNodes();
  const checkedKeys = checkedNodes.map((item: any) => item.id);
  api.roles
    .updateRoleMenus({
      id: dialogForm.value.id,
      menu_ids: checkedKeys,
    })
    .then(() => {
      submit();
    });
}
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
      >
        <el-table-column prop="id" width="50" />
        <el-table-column prop="name" label="角色" />
        <el-table-column prop="remarks" label="备注" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" link @click="hanldeEdit(row)">
              编辑
            </el-button>
            <el-button type="primary" link @click="handleView(row)">
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
      <el-tree
        :data="menuTree"
        :props="defaultProps"
        show-checkbox
        node-key="id"
        default-expand-all
        ref="menuTreeRef"
        class="mb-20"
      />
      <span
        slot="footer"
        class="dialog-footer"
        v-if="!dialogOpreation.includes('view')"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="loadingDialog" @click="handleSubmit"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </ListPage>
</template>
