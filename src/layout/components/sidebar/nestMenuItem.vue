<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
  },
});
</script>

<template>
  <div>
    <el-icon>
      <component :is="iconName" />
    </el-icon>
    <span>{{ title }}</span>
  </div>
</template>

<style lang="scss" scoped></style>
