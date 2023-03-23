<script lang="ts" setup name="Layout">
import Sidebar from './components/sidebar/index.vue';
import Header from './components/header.vue';
</script>
<template>
  <div class="layout-page">
    <Sidebar />
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
  .layout__main {
    flex: 1;
  }
}
</style>
