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
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      min: 4,
      max: 20,
      message: '用户名长度在 4 到 20 个字符',
      trigger: 'blur',
    },
  ],
  roles: [{ required: true, message: '请选择角色', trigger: 'change' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },
  ],
});

async function handleSubmit() {
  const valid = await formRef.value.validate();
  if (valid) {
    console.log(props.form);
    let requestApi;
    if (props.operation.includes('add')) {
      requestApi = api.users.addUser(props.form);
    } else if (props.operation.includes('edit')) {
      requestApi = api.users.updateUser(props.form);
    }
    await requestApi;
    emits('update:modelValue', false);
    emits('afterSubmit');
  }
}

watch(
  () => props.modelValue,
  (val) => {
    // 开启弹窗时重置表单
    if (val) {
      formRef.value?.resetFields();
    }
    // 新增时默认数据
    if (props.operation.includes('add')) {
      props.form.status = 1;
      props.form.roles = [];
    }
  },
  { immediate: true },
);

// 字典
const rolesOptions = ref();
const statusOptions = ref();
api.roles.getRoles().then((res) => {
  const { data } = res.data;
  rolesOptions.value = data.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
});
api.dict('status').then((res) => {
  statusOptions.value = res;
});
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
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" clearable />
      </el-form-item>
      <el-form-item label="启用状态" prop="status">
        <el-select v-model="form.status">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="角色" prop="roles">
        <el-select v-model="form.roles" multiple>
          <el-option
            v-for="item in rolesOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname" clearable />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" clearable />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" clearable />
      </el-form-item>

      <el-form-item
        label="密码"
        v-if="operation.includes('add')"
        prop="password"
      >
        <el-input v-model="form.password" clearable />
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
