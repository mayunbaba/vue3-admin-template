<script lang="ts" setup name="Dashboard">
import useUsersStore from '@/store/users';
const userStore = useUsersStore();
</script>
<template>
  <div>
    <h1>Hello {{ userStore.user.username }}!</h1>
  </div>
</template>
