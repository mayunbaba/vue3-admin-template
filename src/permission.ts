import NProgress from 'nprogress';
import useIdentityStore from '@/store/identity';
import router from '@/router';
import 'nprogress/nprogress.css';
import { generateRoutes } from './utils/route';

// 每次刷新动态路由都会丢失，所以需要重新生成
generateRoutes();

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
    // 有token必然有用户信息
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (router.hasRoute(to.name as string)) {
        next();
      } else {
        console.log('无权限或者页面不存在');
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
