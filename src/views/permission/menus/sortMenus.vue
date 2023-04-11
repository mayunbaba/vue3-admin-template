<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  tableData: any;
}>(); // 传入的参数

const emits = defineEmits(['update:modelValue', 'afterSubmit']); // 传出的参数

function handleNodeDrop(Node: any) {
  // 方案一：每一层及从1开始排序
  // treeAddSort(tableData.value);
  console.log('拖拽', props.tableData);
}

function treeAddSort(list: any) {
  list.forEach((item: any, index: number) => {
    item.sort = index + 1;
    if (item.children) {
      treeAddSort(item.children);
    }
  });
}

function handleSubmit() {
  // emits('update:modelValue', false);
  // emits('afterSubmit');
}
</script>
<template>
  <el-tree :data="tableData" node-key="id" />
  <el-tree
    :data="tableData"
    draggable
    default-expand-all
    node-key="id"
    @node-drop="handleNodeDrop"
    :expand-on-click-node="false"
    :props="{
      children: 'children',
      label: 'title',
    }"
  />
  <span slot="footer" class="dialog-footer">
    <el-button @click="emits('update:modelValue', false)">取 消</el-button>
    <el-button type="primary" @click="handleSubmit"> 确 定 </el-button>
  </span>
</template>
