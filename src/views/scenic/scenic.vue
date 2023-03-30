<script lang="ts" setup>
import listPage from '@/components/listPage.vue';
import { usePagination } from '@/hooks/pagination';
import { useEditForm } from '@/hooks/editForm';
import district from '@/utils/district';
import scenincs from '@/api/scenics';
import BaiduMap from './baiduMap.vue';

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
  address: '',
  longitude: '',
  latitude: '',
};
const rulesDialogForm = reactive({
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  city: [{ required: true, message: '请选择城市', trigger: 'change' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  longitude: [{ required: true, message: '请获取经度', trigger: 'change' }],
  latitude: [{ required: true, message: '请获取纬度', trigger: 'change' }],
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
  loadingDialog,
} = useEditForm({
  dialogFormRef,
  dialogFormInit,
  editAndAdd: scenincs.editAndAdd,
  deleteById: scenincs.deleteById,
  search,
});
// =========================== 页面逻辑 ===========================
const baiduMapRef = ref();

// 获取取经纬度
async function getLngLat() {
  if (dialogForm.value.city && dialogForm.value.address) {
    console.log('获取经纬度');
    try {
      const res = await baiduMapRef.value.getPoint(
        dialogForm.value.city,
        dialogForm.value.address,
      );
      dialogForm.value.longitude = res.lng;
      dialogForm.value.latitude = res.lat;
    } catch (error) {}
  } else {
    baiduMapRef.value.setCenter();
  }
}

// 级联选择器交互
const props = {
  expandTrigger: 'hover' as const,
  value: 'label',
};

watch(
  () => dialogVisible.value,
  () => {
    if (dialogVisible.value) {
      // 第一次打开地图，地图可能还未初始化
      nextTick(() => {
        getLngLat();
      });
    }
  },
  { immediate: true },
);
</script>

<template>
  <list-page>
    <template #add>
      <el-button type="primary" @click="add">新增</el-button>
    </template>
    <template #searchForm>
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="名称">
          <el-input v-model="searchForm.name" placeholder="" clearable />
        </el-form-item>
        <el-form-item label="城市">
          <el-cascader
            v-model="searchForm.city"
            :options="district"
            :props="props"
            clearable
            filterable
          />
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
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="province" label="省" />
        <el-table-column prop="city" label="市" />
        <el-table-column prop="address" label="地址" />
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
        small
        background
        layout="total, sizes, prev, pager, next, jumper"
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
            filterable
            @change="getLngLat"
          />
          <el-button type="primary" @click="getLngLat">获取经纬度</el-button>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="dialogForm.address" clearable @blur="getLngLat" />
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
          <el-input v-model="dialogForm.longitude" clearable disabled />
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="dialogForm.latitude" clearable disabled />
        </el-form-item>
        <BaiduMap
          style="width: 100%; height: 300px; margin-bottom: 10px"
          ref="baiduMapRef"
        />
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
        v-if="!dialogTitle.includes('查看')"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-popconfirm
          title="请确认地图上点位是否正确，确定后将无法修改，确定提交？"
          @confirm="submit"
          width="300px"
        >
          <template #reference>
            <el-button type="primary" :loading="loadingDialog">
              确 定
            </el-button>
          </template>
        </el-popconfirm>
        <!-- <el-button type="primary" :loading="loadingDialog" @click="submit">
          确 定
        </el-button> -->
      </span>
    </el-dialog>
  </list-page>
</template>
