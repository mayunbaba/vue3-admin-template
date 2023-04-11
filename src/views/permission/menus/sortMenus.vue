<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  tableData: any;
}>(); // 传入的参数

const emits = defineEmits(['update:modelValue', 'afterSubmit']); // 传出的参数

function allowDrop(draggingNode: any, dropNode: any, type: any) {
  // 按钮类型不允许添加子节点
  if (type === 'inner' && dropNode.data.type === 2) {
    return false;
  }
  return true;
}

function treeAddSort(list: any, parent_id = 0) {
  list.forEach((item: any, index: number) => {
    item.sort = index + 1;
    item.parent_id = parent_id;
    if (item.children) {
      treeAddSort(item.children, item.id);
    }
  });
}

function handleSubmit() {
  treeAddSort(props.tableData);
  // emits('update:modelValue', false);
  // emits('afterSubmit');
}

function close() {
  emits('update:modelValue', false);
  emits('afterSubmit');
}
</script>
<template>
  <div>
    <el-tree
      :data="tableData"
      draggable
      default-expand-all
      node-key="id"
      class="mb-20"
      :allow-drop="allowDrop"
      :props="{
        children: 'children',
        label: 'title',
      }"
    />
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click="handleSubmit"> 确 定 </el-button>
  </span>
</template>
