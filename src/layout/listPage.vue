<template>
  <div class="list-page">
    <!-- 插槽上不能添加类名 -->
    <slot name="add"></slot>
    <div class="search-wrap"><slot name="searchForm"></slot></div>
    <div class="table-wrap">
      <div class="table"><slot name="table"></slot></div>
      <div class="pagination"><slot name="pagination"></slot></div>
    </div>
  </div>
</template>
<style lang="scss">
.list-page {
  padding: 0px 20px;
}

.shadow {
  border-radius: 5px;
  box-shadow: var(--el-box-shadow-light);
}

.search-wrap {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
  padding: 20px;
  padding-bottom: 0;
  @extend .shadow;
  .el-form-item__content {
    width: 170px;
  }
}
.table-wrap {
  margin: 20px 0;
  padding: 20px;
  @extend .shadow;
}

.pagination {
  margin-top: 20px;
}
</style>
