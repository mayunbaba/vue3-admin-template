import NProgress from 'nprogress';
import useIdentityStore from '@/store/identity';
import router from '@/router';
import 'nprogress/nprogress.css';

const whiteList = ['Login', '404']; // no redirect whitelist

router.beforeEach((to, from, next) => {
  const identityStore = useIdentityStore();
  // 页面转场动画
  NProgress.start();
  // 设置页面标题
  // window.document.title = (to.meta.title as string) || 'Vue3 Admin';
  // 判断是否登录
  if (identityStore.token) {
    next();
  } else {
    // 未登录
    if (whiteList.includes(to.name as string)) {
      // 在免登录白名单，直接进入
      next();
    } else {
      // 否则全部重定向到登录页
      next({ name: 'Login' });
    }
  }
  NProgress.done();
});
