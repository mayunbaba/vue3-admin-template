<script lang="ts" setup name="App">
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import { ref } from 'vue';

const size = ref('medium');
const zIndex = ref(2000);
const locale = ref(zhCn);
</script>
<template>
  <div>
    <el-config-provider :size="size" :z-index="zIndex" :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>
