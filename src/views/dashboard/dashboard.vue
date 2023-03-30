<script lang="ts" setup name="Dashboard">
import useUserStore from '@/store/user';
const userStore = useUserStore();
</script>
<template>
  <div>
    <h1>Hello {{ userStore.user.username }}!</h1>
  </div>
</template>
