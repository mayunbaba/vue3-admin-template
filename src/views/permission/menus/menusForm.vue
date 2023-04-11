<script lang="ts" setup>
import api from '@/api';
const props = defineProps<{
  operation: any;
  form: any;
  modelValue: boolean;
}>(); // 传入的参数

const emits = defineEmits(['update:modelValue', 'afterSubmit']); // 传出的参数

const formRef = ref();
const formRules: any = reactive({
  title: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  route_name: [{ required: true, message: '请输入菜单路径', trigger: 'blur' }],
});

async function handleSubmit() {
  const valid = await formRef.value.validate();
  if (valid) {
    const requestApi = {
      add: api.menus.addMenus,
      edit: api.menus.updateMenus,
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
      // 开启弹窗时重置表单
      formRef.value?.resetFields();
      // 新增时默认数据
      if (props.operation.includes('add')) {
        props.form.parent_id = 0;
        props.form.sort = 0;
      }
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
      label-width="120px"
      :rules="formRules"
      :disabled="operation.includes('view')"
    >
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="form.title" placeholder="" clearable />
      </el-form-item>
      <el-form-item label="前端标识" prop="route_name">
        <el-input v-model="form.route_name" placeholder="" clearable />
      </el-form-item>
      <el-form-item label="权限类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option label="菜单" :value="1" />
          <el-option label="按钮" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="隐藏" prop="hidden">
        <el-switch
          v-model="form.hidden"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="前端路由" prop="route_path">
        <el-input v-model="form.route_path" placeholder="" clearable />
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="form.icon" placeholder="" clearable />
      </el-form-item>
      <el-form-item label="权限标识" prop="api_route_name">
        <el-input v-model="form.api_route_name" placeholder="" clearable />
      </el-form-item>
    </el-form>

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
