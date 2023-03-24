<script lang="ts" setup>
import NestMenuItem from './nestMenuItem.vue';
defineProps({
  route: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <!-- 有多个子路由 -->
  <el-sub-menu
    v-if="route.children && route.children.length > 0"
    :index="route.path"
  >
    <template #title>
      <NestMenuItem
        :title="route.meta?.title || route.name"
        :iconName="route.meta?.iconName"
      />
    </template>
    <!-- 调用自身组件 -->
    <NestMenu v-for="item in route.children" :key="item.path" :route="item" />
  </el-sub-menu>
  <!-- 无子路由 -->
  <el-menu-item v-else :index="route.path">
    <NestMenuItem
      :title="route.meta?.title || route.name"
      :iconName="route.meta?.iconName"
    />
  </el-menu-item>
</template>
