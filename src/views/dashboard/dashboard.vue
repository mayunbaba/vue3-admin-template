<script lang="ts" setup name="Dashboard">
import useIdentityStore from '@/store/identity';
const identityStore = useIdentityStore();
</script>
<template>
  <div>
    <h1>Hello {{ identityStore.user.username }}!</h1>
  </div>
</template>
