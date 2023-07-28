import LocalCache from '@/utils/cache';

import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordName } from 'vue-router';
// import Main from '../views/main/main.vue';
const routes = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
  },
  {
    // path: '/notFound',
    path: '/:pathMatch(.*)*',

    name: 'notFound',
    component: () => import('../views/notfound/notfound.vue'),
  },
];
const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
});

//路由守卫
router.beforeEach(async (to) => {
  console.log('进入路由守卫', to.path);
  // debugger;
  const token = LocalCache.getCache('token');
  const firstMenu = LocalCache.getCache('firstMenu');

  if (!token) {
    // 没有权限
    if (to.path !== '/login') {
      return '/login';
    }
  } else {
    if (to.path == '/login') {
      return '/';
    }

    if (to.path == '/main') {
      return firstMenu.url;
    }
  }
});
// 重置路由
export const resetRouter = () => {
  const routes = router.getRoutes();
  routes.forEach((item) => {
    if (!['main', 'login', 'notFound'].includes(item.name as string)) {
      router.removeRoute(item.name as RouteRecordName);
    }
  });
  // console.log(newRouter);
};
export default router;
