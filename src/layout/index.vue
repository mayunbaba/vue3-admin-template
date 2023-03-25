<script lang="ts" setup name="Layout">
import Sidebar from './components/sidebar/index.vue';
import Header from './components/header.vue';
</script>
<template>
  <div class="layout-page">
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
  .sidebar {
    width: 200px;
  }
  .layout__main {
    width: calc(100% - 200px);
  }
}
</style>
