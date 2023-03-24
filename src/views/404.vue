<template>
  <div class="page-404">
    <div class="content">
      <div class="title">404</div>
      <div class="desc">抱歉，你访问的页面不存在</div>
    </div>
  </div>
</template>
<style lang="scss">
.page-404 {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    text-align: center;
    .title {
      font-size: 100px;
      font-weight: 700;
      color: var(--el-color-primary);
    }
    .desc {
      font-size: 24px;
      color: var(--el-color-info);
      margin-top: 12px;
    }
  }
}
</style>
