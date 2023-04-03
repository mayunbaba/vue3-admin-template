import NProgress from 'nprogress';
import useIdentityStore from '@/store/identity';
import router from '@/router';
import 'nprogress/nprogress.css';
import { generateRoutes } from '@/utils/route';

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
      // 判断当前用户是否已拉取完user_info信息，用户信息包含菜单权限
      const hasUserInfo = useIdentityStore().user.username;
      if (!hasUserInfo) {
        // 获取用户信息
        await useIdentityStore().getUserInfo();
      }
      if (router.hasRoute(to.name as string)) {
        // 已经添加过路由
        next();
      } else {
        // 动态添加路由
        generateRoutes(useIdentityStore().permission.menus);
        try {
          next(to);
        } catch (error) {
          console.log('页面不存在，或者无权限访问');
          next('/404');
        }
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
