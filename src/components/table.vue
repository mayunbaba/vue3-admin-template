<script lang="ts" setup>
import { usePagination } from '@/hooks/pagination';
import { useDialog } from '@/hooks/dialog';
import { useRoute } from 'vue-router';
import { localStorage } from '@/utils/storage';

const props = defineProps<{
  searchFormInitData: any;
  queryApi: any;
  delApi: any;
  tableCloumns: any;
  selection: boolean;
}>(); // 传入的参数

// 获取列宽数据
const route = useRoute();
const routeName = route.name as string;
const storageData = localStorage.get(routeName) || {
  tableCloumnsWidth: {},
  tableCloumnsShow: [],
};
const { tableCloumnsWidth } = storageData;
props.tableCloumns.forEach((item: any) => {
  if (tableCloumnsWidth[item.prop]) {
    item.width = tableCloumnsWidth[item.prop];
  }
});
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
  multipleSelection,
  handleSelectionChange,
  elTableRef,
} = usePagination({
  searchFormInitData: props.searchFormInitData,
  queryApi: props.queryApi,
  delApi: props.delApi,
});

// 列设置
const tableCloumnsSettings = ref(
  props.tableCloumns.filter((item: any) => item.prop),
);
const tableCloumnsShow = ref();
if (storageData.tableCloumnsShow.length > 0) {
  tableCloumnsShow.value = storageData.tableCloumnsShow;
} else {
  tableCloumnsShow.value = tableCloumnsSettings.value.map(
    (item: any) => item.prop,
  );
}
watch(
  () => tableCloumnsShow.value,
  (val) => {
    storageData.tableCloumnsShow = val;
    localStorage.set(routeName, storageData);
  },
);
function headerDragend(newWidth: any, oldWidth: any, column: any, event: any) {
  storageData.tableCloumnsWidth[column.property] = column.realWidth;
  localStorage.set(routeName, storageData);
}

function resetCloumnsSettings() {
  storageData.tableCloumnsWidth = {};
  // 重复赋值，watch依然会触发，顺带保存了tableCloumnsShow
  tableCloumnsShow.value = tableCloumnsSettings.value.map(
    (item: any) => item.prop,
  );
  location.reload();
}
// 排序
function handleSortChange({ prop, order }: any) {
  console.log(prop, order, '调用后端排序接口');
  // 调用后端排序接口
}

// 单选
const singleSelect = ref();

// 自带的筛选功能不支持接口排序且ui不美观，功能单一，所以这里自己实现

// 弹窗
const { dialog, handleAdd, handleEdit, handleView } = useDialog();

function formatTableValue(val: any) {
  if (val === null || val === undefined || val.length === 0) {
    return '--';
  } else {
    return val;
  }
}

defineExpose({
  dialog,
  singleSelect,
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
      <div class="mb-20 flex">
        <slot name="add">
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </slot>
        <el-popconfirm
          title="删除后将无法恢复，确定删除？"
          @confirm="del(multipleSelection)"
        >
          <template #reference>
            <el-button type="danger" :disabled="!multipleSelection?.length">
              批量删除
            </el-button>
          </template>
        </el-popconfirm>
        <el-button type="primary" link>
          已选择{{ multipleSelection?.length || 0 }}条
        </el-button>
        <slot name="btnGroup"> </slot>
        <div class="last-one">
          <el-dropdown :hide-on-click="false">
            <el-button type="primary">
              列设置
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-checkbox-group v-model="tableCloumnsShow">
                  <template v-for="(item, index) in tableCloumnsSettings">
                    <el-dropdown-item v-if="item.prop" :key="index">
                      <el-checkbox :label="item.prop">
                        {{ item.label }}
                      </el-checkbox>
                    </el-dropdown-item>
                  </template>
                </el-checkbox-group>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button @click="resetCloumnsSettings">重置列设置</el-button>
        </div>
      </div>

      <el-table
        :data="tableData"
        border
        v-loading="loading"
        @sort-change="handleSortChange"
        @selection-change="handleSelectionChange"
        @header-dragend="headerDragend"
        element-loading-text="Loading..."
        element-loading-background="rgba(122, 122, 122, 0.8)"
        default-expand-all
        ref="elTableRef"
        row-key="id"
      >
        <el-table-column
          v-if="selection"
          type="selection"
          :reserve-selection="true"
        ></el-table-column>
        <template v-for="cloumn in tableCloumns">
          <el-table-column v-if="cloumn.type === 'radio'" width="50">
            <template #default="{ row }">
              <el-radio v-model="singleSelect" :label="row.id">&nbsp;</el-radio>
            </template>
          </el-table-column>
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
              <slot name="operationFront" :row="row"></slot>
              <slot name="operation" :row="row">
                <el-button
                  link
                  type="primary"
                  @click="handleEdit(row)"
                  class="edit"
                >
                  编辑
                </el-button>
                <el-button
                  link
                  type="primary"
                  @click="handleView(row)"
                  class="view"
                >
                  查看
                </el-button>
                <el-popconfirm
                  title="删除后将无法恢复，确定删除？"
                  @confirm="del([row])"
                >
                  <template #reference>
                    <el-button type="danger" link class="del">Delete</el-button>
                  </template>
                </el-popconfirm>
              </slot>
              <slot name="operationBehind" :row="row"></slot>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="tableCloumnsShow.includes(cloumn.prop)"
            :prop="cloumn.prop"
            :label="cloumn.label"
            :width="cloumn.width"
            :formatter="cloumn.formatter"
            :fixed="cloumn.fixed"
            :sortable="cloumn.sortable"
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
    <el-dialog
      v-if="dialog.uiType === 'dialog'"
      v-model="dialog.visible"
      :title="dialog.title"
      width="50%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      draggable
    >
      <slot
        name="dialogContent"
        :dialog="dialog"
        :search="search"
        :tableData="tableData"
      ></slot>
    </el-dialog>
    <el-drawer
      v-else-if="dialog.uiType === 'drawer'"
      v-model="dialog.visible"
      :title="dialog.title"
      :with-header="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <slot
        name="dialogContent"
        :dialog="dialog"
        :search="search"
        :tableData="tableData"
      ></slot>
    </el-drawer>
  </div>
</template>
