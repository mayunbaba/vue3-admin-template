<script lang="ts" setup>
import api from '@/api';
const props = defineProps<{
  dialogOpreation: any;
  dialogForm: any;
  loadingDialog: any;
  dialogVisible: boolean;
}>(); // 传入的参数

const emits = defineEmits(['update:dialogVisible', 'submit']); // 传出的参数

const dialogFormRef = ref();
const dialogFormRules: any = reactive({
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

function handleSubmit() {
  dialogFormRef.value.validate((valid: any) => {
    if (valid) {
      emits('submit', props.dialogForm);
    }
  });
}

watch(
  () => props.dialogVisible,
  (val) => {
    if (val) {
      dialogFormRef.value?.resetFields();
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
      ref="dialogFormRef"
      :model="dialogForm"
      label-width="80px"
      :rules="dialogFormRules"
      :disabled="dialogOpreation.includes('view')"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="dialogForm.username" placeholder="" clearable />
      </el-form-item>
      <el-form-item label="启用状态" prop="status">
        <el-select v-model="dialogForm.status" placeholder="">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="角色" prop="roles">
        <el-select v-model="dialogForm.roles" placeholder="" multiple>
          <el-option
            v-for="item in rolesOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="dialogForm.nickname" placeholder="" clearable />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="dialogForm.mobile" placeholder="" clearable />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="dialogForm.email" placeholder="" clearable />
      </el-form-item>

      <el-form-item
        label="密码"
        v-if="dialogOpreation.includes('add')"
        prop="password"
      >
        <el-input v-model="dialogForm.password" placeholder="" clearable />
      </el-form-item>
    </el-form>
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
