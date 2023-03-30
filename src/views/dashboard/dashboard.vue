<script lang="ts" setup name="Dashboard">
import useUsersStore from '@/store/users';
const usersStore = useUsersStore();
</script>
<template>
  <div>
    <h1>Hello {{ usersStore.user.username }}!</h1>
  </div>
</template>
