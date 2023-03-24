<script lang="ts" setup name="App">
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import { ref } from 'vue';

const size: any = ref('default');
const zIndex = ref(2000);
const locale = ref(zhCn);
</script>
<template>
  <el-config-provider :size="size" :z-index="zIndex" :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>
<style lang="scss">
#app {
  height: 100vh;
  box-sizing: border-box;
  * {
    box-sizing: inherit;
  }
}
</style>
