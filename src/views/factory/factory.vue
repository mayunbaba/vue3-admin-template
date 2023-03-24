<script lang="ts" setup>
import { useFetch } from '@/hooks/fetch';

const { list } = useFetch('/factories');
console.log(list);
</script>

<template>
  <div>
    <div>{{ list }}</div>
  </div>
</template>
