import router from '@/router';
import routesMap from '@/router/routesMap';
import useIdentityStore from '@/store/identity';

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

// 生成路由
function generateRoutes() {
  let identityStore;
  let menus;
  try {
    // 从store中获取
    identityStore = useIdentityStore();
    menus = identityStore.permission.menus;
  } catch (error) {
    try {
      // 从sessionStorage中获取
      identityStore = JSON.parse(
        sessionStorage.getItem('identityStore') as string,
      );
      menus = identityStore.permission.menus;
    } catch (error) {
      console.log(error);
      return;
    }
  }
  const treeMenu = listToTree(menus);
  treeMenu.forEach((route: any) => addRoute(route, 'Layout'));
}

function addRoute(route: any, parentName: string = 'Layout') {
  // 动态路由必须先添加父路由
  router.addRoute(parentName, {
    path: route.path,
    name: route.name,
    component: routesMap[route.path as '/dashboard'],
  });
  if (route.children) {
    route.children.forEach((child: any) => addRoute(child, route.name));
  }
}

export { generateRoutes, listToTree };
