<script lang="ts" setup>
import useIdentityStore from '@/store/identity';
import { storeToRefs } from 'pinia';
const identityStore = useIdentityStore();

const { user } = storeToRefs(identityStore);
</script>
<template>
  <div class="header shadow">
    <div></div>
    <div class="right">
      <el-dropdown>
        <div class="profile">
          <i class="iconfont icon-touxiang"></i>
          <span>{{ user.username }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item disabled>修改密码</el-dropdown-item>
            <el-dropdown-item divided @click="identityStore.logout()">
              退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 50px;
  background-color: var(--el-bg-color);
  display: flex;
  justify-content: space-between;
  .profile {
    display: flex;
    height: 50px;
    align-items: center;
    font-size: 24px;
    padding: 0 20px;
    i {
      font-size: 24px;
      margin-right: 8px;
    }
  }
}
</style>
