<script lang="ts" setup>
import NestMenu from './nestMenu.vue';
import { RouteRecordRaw } from 'vue-router';
import useIdentity from '@/store/identity';
import { listToTree } from '@/utils/tree';

const collapge = ref(false);
// 过滤掉hidden为true的路由
const routes = computed(() => {
  return listToTree(useIdentity().permission.menus).filter(treeDeleteHidden);
});

// 如果只包含一个子路由，那么就不显示父路由
function filterSingleRoute(route: RouteRecordRaw) {
  if (route.children && route.children.length === 1) {
    const child = route.children[0];
    if (child.children && child.children.length > 0) {
      route.children = child.children;
    } else {
      route.path = child.path;
      route.name = child.name;
      route.meta = child.meta;
      route.children = child.children;
    }
  }
  if (route.children) {
    route.children.forEach(filterSingleRoute);
  }
}

// 递归过滤掉hidden为true的路由
function treeDeleteHidden(route: any) {
  if (route.hidden === true) {
    return false;
  }
  if (route.children) {
    route.children = route.children.filter(treeDeleteHidden);
  }
  return true;
}
</script>
<template>
  <div class="side-bar">
    <el-scrollbar height="100vh">
      <el-menu :collapse="collapge" router>
        <NestMenu v-for="item in routes" :key="item.path" :route="item" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.side-bar {
  background-color: var(--el-menu-bg-color);
}

.sub-menu-wrap {
  .el-menu-item {
    background: #1f2d3d;
  }
}
</style>
