<script lang="ts" setup name="Login">
// import { request } from '@/utils';
import { ref } from 'vue';
import useUserStore from '@/stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const identifier = ref('admin');
const password = ref('!QA2ws3ed');
async function login() {
  const res = await userStore.login({
    identifier: identifier.value,
    password: password.value,
  });
  if (!res) return;
  // request.defaults.headers.common['Authorization'] = `Bearer ${res.jwt}`;
  router.push({ path: '/' });
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
