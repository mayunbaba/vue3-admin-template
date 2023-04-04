<script lang="ts" setup name="Login">
import useIdentityStore from '@/store/identity';
import { generateRoutes } from '@/utils/route';
import { useRouter } from 'vue-router';

const identityStore = useIdentityStore();
const router = useRouter();
const username = ref('admin');
const password = ref('abc888888');
async function login() {
  await identityStore.login({
    username: username.value,
    password: password.value,
  });
  // 获取用户信息包含菜单权限
  await identityStore.getUserInfo();
  // 生成路由
  generateRoutes();
  const redirect = router.currentRoute.value.query.redirect;
  if (redirect) {
    router.replace({ path: redirect as string });
    return;
  }
  router.replace({ path: '/' });
}
</script>
<template>
  <div class="login-page">
    <el-form>
      <el-form-item label="账号">
        <el-input v-model="username"></el-input>
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
<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
