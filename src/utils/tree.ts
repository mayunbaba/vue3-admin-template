function listToTree(list: any) {
  const map: any = {};
  const roots = [];

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

function treeToList(tree: any[]) {
  const list: any[] = [];
  tree.forEach((item: any) => {
    list.push(item);
    if (item.children) {
      list.push(...treeToList(item.children));
    }
  });
  return list;
}

function updateTreeAttrs(tree: any[], attrs: string | number, value: any) {
  tree.forEach((item: any) => {
    item[attrs] = value;
    if (item.children) {
      updateTreeAttrs(item.children, attrs, value);
    }
  });
}

export { listToTree, treeToList, updateTreeAttrs };
