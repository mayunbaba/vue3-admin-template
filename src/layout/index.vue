<script lang="ts" setup name="Layout">
import Sidebar from './components/sidebar/index.vue';
import Header from './components/header.vue';

// import { useRouter } from 'vue-router';

// onMounted(() => {
//   const Router = useRouter();
//   console.log(Router.options.routes);
// });
</script>
<template>
  <div class="layout-page">
    <div class="sidebar-empty"></div>
    <Sidebar class="sidebar" />
    <div class="layout__main">
      <Header />
      <router-view />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.layout-page {
  display: flex;
  height: 100%;
  .sidebar-empty {
    width: 200px;
  }
  .sidebar {
    width: 200px;
    position: fixed;
  }
  .layout__main {
    width: calc(100% - 200px);
    height: 100%;
    overflow-y: scroll;
  }
}
</style>
