<script lang="ts" setup name="Login">
import { request } from '@/utils';
import { ref } from 'vue';

const identifier = ref('');
const password = ref('');
async function login() {
  const res = await request.post('/auth/local', {
    identifier: identifier.value,
    password: password.value,
  });
  console.log(res);
}
</script>
<template>
  <div>
    <el-form>
      <el-form-item label="账号">
        <el-input v-model="identifier"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
