<script lang="ts" setup name="Login">
import { ref } from 'vue';

const email = ref('');
const password = ref('');
function login() {
  console.log('login');
}
</script>
<template>
  <div>
    <el-form>
      <el-form-item label="Email">
        <el-input v-model="email"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
