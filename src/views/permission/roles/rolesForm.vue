<script lang="ts" setup>
import api from '@/api';
import { updateTreeAttrs } from '@/utils/tree';
const props = defineProps<{
  operation: any;
  form: any;
  modelValue: boolean;
}>(); // 传入的参数

const emits = defineEmits(['update:modelValue', 'afterSubmit']); // 传出的参数

const formRef = ref();
const formRules: any = reactive({
  name: [{ required: true, message: '请输入角色', trigger: 'blur' }],
  remarks: [{ required: true, message: '请输入备注', trigger: 'blur' }],
});

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

function afterOpenDialog() {
  // 开启弹窗时重置表单
  formRef.value?.resetFields();
  if (props.operation === 'add') return;
  api.roles
    .getRoleMenus(props.form)
    .then((res) => {
      const roleMenus = res.data;
      // 只勾选type为2的节点，type为1的节点是菜单，不需要勾选
      const checkedKeys = roleMenus
        .filter((item: any) => item.type === 2)
        .map((item: any) => item.id);
      menuTreeRef.value.setCheckedKeys(checkedKeys);
    })
    .then(() => {
      updateTreeAttrs(menuTree.value, 'disabled', props.operation === 'view');
    });
}

async function beforeSubmit() {
  // 把半选中的节点也加入到选中的节点中，这样后端才能正确的更新菜单
  const checkedKeys = menuTreeRef.value.getCheckedKeys();
  const halfCheckedKeys = menuTreeRef.value.getHalfCheckedKeys();
  await api.roles.updateRoleMenus({
    id: props.form.id,
    menu_ids: [...checkedKeys, ...halfCheckedKeys],
  });
}

async function handleSubmit() {
  const valid = await formRef.value.validate();
  if (valid) {
    if (props.operation === 'edit') {
      await beforeSubmit();
    }
    const requestApi = {
      add: api.roles.addRole,
      edit: api.roles.updateRole,
    }[props.operation as 'add' | 'edit'];
    await requestApi(props.form);
    emits('update:modelValue', false);
    emits('afterSubmit');
  }
}

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      afterOpenDialog();
    }
  },
  { immediate: true },
);
</script>

<template>
  <div>
    <el-form
      ref="formRef"
      :model="form"
      label-width="80px"
      :rules="formRules"
      :disabled="operation.includes('view')"
    >
      <el-form-item label="角色" prop="name">
        <el-input v-model="form.name" placeholder="" clearable />
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input v-model="form.remarks" placeholder="" clearable />
      </el-form-item>
    </el-form>
    <el-tree
      v-show="!operation.includes('add')"
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
      v-if="!operation.includes('view')"
    >
      <el-button @click="emits('update:modelValue', false)">取 消</el-button>
      <el-button type="primary" @click="handleSubmit"> 确 定 </el-button>
    </span>
  </div>
</template>
