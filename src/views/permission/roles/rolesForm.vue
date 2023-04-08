<script lang="ts" setup>
import api from '@/api';
import { updateTreeAttrs } from '@/utils/tree';
const props = defineProps<{
  dialogOpreation: any;
  dialogForm: any;
  loadingDialog: any;
  dialogVisible: boolean;
}>(); // 传入的参数

const emits = defineEmits(['update:dialogVisible', 'submit']); // 传出的参数

const dialogFormRef = ref();
const dialogFormRules: any = reactive({
  name: [
    { required: true, message: '请输入角色', trigger: 'blur' },
    {
      min: 4,
      max: 20,
      message: '用户名长度在 4 到 20 个字符',
      trigger: 'blur',
    },
  ],
});

watch(
  () => props.dialogVisible,
  (val) => {
    if (val) {
      dialogFormRef.value?.resetFields();
      nextTick(() => {
        console.log(props.dialogForm);
        if (props.dialogOpreation === 'edit') {
          hanldeEdit(props.dialogForm);
        } else if (props.dialogOpreation === 'view') {
          handleView(props.dialogForm);
        }
      });
    }
  },
  { immediate: true },
);
// =========================== 页面逻辑 ===========================
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
  updateTreeAttrs(menuTree.value, 'disabled', false);
  api.roles.getRoleMenus(row).then((res) => {
    const roleMenus = res.data;
    menuTreeRef.value.setCheckedNodes(roleMenus);
  });
}
function handleView(row: any) {
  // 禁用menuTree所有节点
  updateTreeAttrs(menuTree.value, 'disabled', true);
  api.roles.getRoleMenus(row).then((res) => {
    const roleMenus = res.data;
    menuTreeRef.value.setCheckedNodes(roleMenus);
  });
}
function handleSubmit() {
  dialogFormRef.value.validate((valid: any) => {
    if (valid) {
      const checkedNodes = menuTreeRef.value.getCheckedNodes();
      const checkedKeys = checkedNodes.map((item: any) => item.id);
      api.roles
        .updateRoleMenus({
          id: props.dialogForm.id,
          menu_ids: checkedKeys,
        })
        .then(() => {
          emits('submit');
        });
    }
  });
}
</script>

<template>
  <div>
    <el-form
      ref="dialogFormRef"
      :model="dialogForm"
      label-width="80px"
      :rules="dialogFormRules"
      :disabled="dialogOpreation.includes('view')"
    >
      <el-form-item label="角色" prop="name">
        <el-input v-model="dialogForm.name" placeholder="" clearable />
      </el-form-item>
      <el-form-item label="备注" prop="nickname">
        <el-input v-model="dialogForm.remarks" placeholder="" clearable />
      </el-form-item>
    </el-form>
    <el-tree
      v-show="!dialogOpreation.includes('add')"
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
      <el-button @click="emits('update:dialogVisible', false)">取 消</el-button>
      <el-button type="primary" :loading="loadingDialog" @click="handleSubmit">
        确 定
      </el-button>
    </span>
  </div>
</template>
