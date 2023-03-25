<script lang="ts" setup>
import { usePagination } from '@/hooks/pagination';
import { useEditFormList } from '@/hooks/editFormList';
import district from '@/utils/district';
import scenincs from '@/api/scenics';

// 级联选择器交互
const props = {
  expandTrigger: 'hover' as const,
  value: 'label',
};

// 查询
const searchFormInit = {
  name: '',
  city: [],
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
  queryList: scenincs.queryList,
});

// 编辑、查看、新增
const dialogFormRef = ref();
const dialogFormInit = {
  id: '',
  name: '',
  city: [],
  longitude: '',
  latitude: '',
};
const rulesDialogForm = reactive({
  name: [
    {
      required: true,
      message: '请输入名称',
      trigger: 'blur',
    },
  ],
  city: [
    {
      required: true,
      message: '请选择城市',
      trigger: 'change',
    },
  ],
  longitude: [
    {
      required: true,
      message: '请输入经度',
      trigger: 'blur',
    },
  ],
  latitude: [
    {
      required: true,
      message: '请输入纬度',
      trigger: 'blur',
    },
  ],
});
const {
  dialogVisible,
  dialogTitle,
  dialogOpreation,
  dialogForm,
  add,
  del,
  edit,
  view,
  submit,
  loading: loadingDialog,
} = useEditFormList({
  dialogFormRef,
  dialogFormInit,
  updateOrCreate: scenincs.updateOrCreate,
  deleteById: scenincs.deleteById,
  search,
});
</script>

<template>
  <div class="page-container">
    <!-- 搜索 -->
    <el-form :inline="true" :model="searchForm" class="area-wrap search-from">
      <el-form-item label="名称">
        <el-input v-model="searchForm.name" placeholder="" clearable />
      </el-form-item>
      <el-form-item label="城市">
        <el-cascader
          v-model="searchForm.city"
          :options="district"
          :props="props"
          clearable
        />
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
        <!-- <el-table-column prop="id" label="序号" /> -->
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="province" label="省" />
        <el-table-column prop="city" label="市" />
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
        small
        background
        class="pagination"
        layout="total, sizes, prev, pager, next, jumper"
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
        <el-form-item label="名称" prop="name">
          <el-input v-model="dialogForm.name" placeholder="" clearable />
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-cascader
            :show-all-levels="false"
            v-model="dialogForm.city"
            :options="district"
            :props="props"
            clearable
          />
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
          <el-input v-model="dialogForm.longitude" clearable disabled />
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="dialogForm.latitude" clearable disabled />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
        v-if="!dialogTitle.includes('查看')"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit" :loading="loadingDialog">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
