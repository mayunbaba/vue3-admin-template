import NProgress from 'nprogress';
import useIdentityStore from '@/store/identity';
import router from '@/router';
import 'nprogress/nprogress.css';

const whiteList = ['Login', '404']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // 页面转场动画
  NProgress.start();
  if (whiteList.indexOf(to.name as string) !== -1) {
    next();
    return;
  }
  // 用户是否已登录
  const hasToken = useIdentityStore().token;
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      // 判断当前用户是否已拉取完user_info信息，并且已经获取到了菜单权限
      // 只要路由不在menus中，就无权限访问
      // 所以要把404页面放在menus中
      const hasMenus = useIdentityStore().permission.menus.length > 0;
      if (!hasMenus) {
        // 获取用户信息
        await useIdentityStore().getUserInfo();
      }
      if (useIdentityStore().hasMenuPermission(to.name as string)) {
        try {
          next();
        } catch (error) {
          // 删除token并跳转到登录页面重新登录
          useIdentityStore().logout();
        }
      } else {
        console.log('无权限访问');
        next('/404');
      }
    }
  } else {
    next(`/login?redirect=${to.path}`);
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
