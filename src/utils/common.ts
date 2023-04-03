function getLabelByValue(options: any[], value: string) {
  if (!options || !options.length) return '';
  const option = options.find((item) => item.value === value);
  return option ? option.label : '';
}

const dialogTitleObj = {
  add: '新增',
  edit: '编辑',
  view: '查看',
};

function updateTreeAttrs(tree: any[], attrs: string | number, value: any) {
  tree.forEach((item: any) => {
    item[attrs] = value;
    if (item.children) {
      updateTreeAttrs(item.children, attrs, value);
    }
  });
}

interface TreeNode {
  id: number;
  parent_id: number;
  children?: TreeNode[];
}

function listToTree(list: TreeNode[]): TreeNode[] {
  const map: Record<number, TreeNode> = {};
  const roots: TreeNode[] = [];

  // First pass: create a map of all nodes
  for (const node of list) {
    map[node.id] = { ...node, children: [] };
  }

  // Second pass: link child nodes to parent nodes
  for (const node of list) {
    const parent = map[node.parent_id];
    if (parent) {
      parent.children?.push(map[node.id]);
    } else {
      roots.push(map[node.id]);
    }
  }

  return roots;
}

export { getLabelByValue, dialogTitleObj, updateTreeAttrs, listToTree };
