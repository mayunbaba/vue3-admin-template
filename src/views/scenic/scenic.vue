<script lang="ts" setup>
import { usePagination } from '@/hooks/pagination';
import request from '@/utils/request';

const searchForm = reactive({
  name: '',
  province: '',
  city: '',
});

const tableCloums = reactive([
  {
    prop: 'name',
    label: '名称',
  },
  {
    prop: 'province',
    label: '省',
  },
  {
    prop: 'city',
    label: '市',
  },
]);

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
  url: '/scenics',
  searchForm,
});

const scenicsInitState = {
  id: '',
  name: '',
  province: '',
  city: '',
  longitude: '',
  latitude: '',
};
const dialogVisible = ref(false);
const dialogTitle = ref('新增');
const dialogForm = reactive({
  ...scenicsInitState,
});

const rulesDialogForm = reactive({
  name: [
    {
      required: true,
      message: '请输入名称',
      trigger: 'blur',
    },
  ],
  province: [
    {
      required: true,
      message: '请输入省',
      trigger: 'blur',
    },
  ],
  city: [
    {
      required: true,
      message: '请输入市',
      trigger: 'blur',
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

function edit(row: any) {
  dialogTitle.value = '编辑';
  dialogVisible.value = true;
  Object.assign(dialogForm, row);
}
function view(row: any) {
  dialogTitle.value = '查看';
  dialogVisible.value = true;
  Object.assign(dialogForm, row);
}
function add() {
  dialogTitle.value = '新增';
  dialogVisible.value = true;
  Object.assign(dialogForm, {
    ...scenicsInitState,
  });
}
function submit(dialogForm: any, type: string) {
  const url = type === '新增' ? '/scenics' : `/scenics/${dialogForm.id}`;
  const method = type === '新增' ? 'post' : 'put';
  const params = type === '新增' ? dialogForm : { ...dialogForm };
  delete params.id;
  request({
    url,
    method,
    data: {
      data: params,
    },
  })
    .then((res) => {
      dialogVisible.value = false;
      search();
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>

<template>
  <div class="page-container">
    <!-- 搜索 -->
    <el-form :inline="true" :model="searchForm" class="area-wrap search-from">
      <el-form-item label="名称">
        <el-input v-model="searchForm.name" placeholder="" clearable />
      </el-form-item>
      <el-form-item label="省">
        <el-input v-model="searchForm.province" placeholder="" clearable />
      </el-form-item>
      <el-form-item label="市">
        <el-input v-model="searchForm.city" placeholder="" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button>清空</el-button>
      </el-form-item>
    </el-form>
    <!-- 功能区 -->
    <div class="flex">
      <el-button type="primary" class="last-one" @click="add">新增</el-button>
    </div>
    <!-- 表格 -->
    <div class="area-wrap">
      <el-table :data="tableData" border>
        <template v-for="cloums in tableCloums" :key="cloums.label">
          <el-table-column :prop="cloums.prop" :label="cloums.label" />
        </template>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" size="small" link @click="edit(row)">
              编辑
            </el-button>
            <el-button type="primary" size="small" link @click="view(row)">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="total > 0"
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
      <el-form :model="dialogForm" label-width="80px" :rules="rulesDialogForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="dialogForm.name" placeholder="" clearable />
        </el-form-item>
        <el-form-item label="省" prop="province">
          <el-input v-model="dialogForm.province" placeholder="" clearable />
        </el-form-item>
        <el-form-item label="市" prop="city">
          <el-input v-model="dialogForm.city" placeholder="" clearable />
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
        <el-button type="primary" @click="submit(dialogForm, dialogTitle)">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
