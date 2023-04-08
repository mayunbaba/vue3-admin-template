<script lang="ts" setup>
import ListPage from '@/components/listPage.vue';
import { usePagination } from '@/hooks/pagination';
import api from '@/api';
import { useEditForm } from '@/hooks/editForm';

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
} = usePagination({
  queryApi: api.menus.getMenuTree,
});
// 编辑、查看、新增
const dialogFormRef = ref();
const dialogFormInitData = {};
const dialogFormRules: any = reactive({
  title: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  route_name: [{ required: true, message: '请输入菜单路径', trigger: 'blur' }],
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
  addApi: api.menus.addMenus,
  editApi: api.menus.updateMenus,
  delApi: api.menus.deleteMenus,
  viewApi: api.menus.getMenu,
  search,
});
// =========================== 页面逻辑 ===========================
function handleAdd(row?: any) {
  add();
  if (row) {
    dialogForm.value.parent_id = row.id;
  } else {
    dialogForm.value.parent_id = 0;
  }
}

const sortDialogVisible = ref(false);
function handleSortClose() {
  sortDialogVisible.value = false;
  // 提交排序，全部重排
  // search();
}

function handleNodeDrop(Node: any) {
  // 方案一：每一层及从1开始排序
  treeAddSort(tableData.value);
}

function treeAddSort(list: any) {
  list.forEach((item: any, index: number) => {
    item.sort = index + 1;
    if (item.children) {
      treeAddSort(item.children);
    }
  });
}
</script>

<template>
  <ListPage class="menus-page">
    <template #add>
      <el-button type="primary" @click="handleAdd()">新增</el-button>
      <el-button type="primary" @click="sortDialogVisible = true"
        >排序</el-button
      >
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
        <el-table-column type="index" width="55" />
        <el-table-column prop="title" label="菜单名称">
          <template #default="{ row }">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sort" width="55" />
        <el-table-column prop="route_name" label="前端标识" />
        <el-table-column prop="type" label="权限类型">
          <template #default="{ row }">
            <el-tag v-if="row.type === 1" type="danger">菜单</el-tag>
            <el-tag v-else-if="row.type === 2" type="success">按钮</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="hidden" label="隐藏">
          <template #default="{ row }">
            <div v-if="row.type === 1">
              <el-tag v-if="row.hidden === 1" type="danger">是</el-tag>
              <el-tag v-else-if="row.hidden === 0" type="success">否</el-tag>
            </div>
            <div v-else></div>
          </template>
        </el-table-column>
        <el-table-column prop="route_path" label="前端路由" />
        <el-table-column prop="icon" label="图标" />
        <el-table-column prop="api_route_name" label="权限标识" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleAdd(row)">
              添加子菜单
            </el-button>
            <el-button type="primary" link @click="edit(row)">编辑</el-button>
            <el-button type="primary" link @click="view(row)">查看</el-button>
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
        label-width="120px"
        :rules="dialogFormRules"
        :disabled="dialogOpreation.includes('view')"
      >
        <el-form-item label="菜单名称" prop="title">
          <el-input v-model="dialogForm.title" placeholder="" clearable />
        </el-form-item>
        <el-form-item label="前端标识" prop="route_name">
          <el-input v-model="dialogForm.route_name" placeholder="" clearable />
        </el-form-item>
        <el-form-item label="权限类型" prop="type">
          <el-select v-model="dialogForm.type" placeholder="请选择">
            <el-option label="菜单" :value="1" />
            <el-option label="按钮" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="隐藏" prop="hidden">
          <el-switch
            v-model="dialogForm.hidden"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="前端路由" prop="route_path">
          <el-input v-model="dialogForm.route_path" placeholder="" clearable />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="dialogForm.icon" placeholder="" clearable />
        </el-form-item>
        <el-form-item label="权限标识" prop="api_route_name">
          <el-input
            v-model="dialogForm.api_route_name"
            placeholder=""
            clearable
          />
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
    <!-- 排序抽屉 -->
    <el-drawer
      v-model="sortDialogVisible"
      :before-close="handleSortClose"
      :with-header="false"
    >
      <template #default>
        <el-tree
          :draggable="true"
          :data="tableData"
          :highlight-current="true"
          @node-drop="handleNodeDrop"
          :props="{
            children: 'children',
            label: 'title',
          }"
        />
      </template>
    </el-drawer>
  </ListPage>
</template>
<style lang="scss">
.menus-page {
  .search-wrap {
    display: none;
  }
}
</style>
