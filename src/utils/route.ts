import router from '@/router';
import routesMap from '@/router/routesMap';
import useIdentityStore from '@/store/identity';
import { listToTree } from './tree';

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

export { generateRoutes };
