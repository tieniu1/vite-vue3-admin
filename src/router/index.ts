import { createRouter,createWebHashHistory } from 'vue-router';
import type {RouteRecordName} from 'vue-router';
// import Main from '../views/main/main.vue';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/main/main.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
  },
  {
    path: '/notFound',
    name: 'notFound',
    component: () => import('../views/notfound/notfound.vue'),
  },
];
const router = createRouter({
  // TODO 在本地如果使用createWebHistory,会导致每次跳转路由vue项目都会重新加载,暂时不知道什么原因.使用 createWebHashHistory 没有这个问题
  // history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHashHistory(),
  routes,
});

//路由守卫
router.beforeEach((to) => {
  const token = LocalCache.getCache('token');
  console.log(token, to);
  // 没有匹配到,进入404页面
  if (to.matched.length === 0) {
    return '/notFound';
  }
  if (!token) {
    // 没有权限
    if (to.path !== '/login') {
      return '/login';
    }
  } else {
    if (to.path == '/login') {
      return '/';
    }
  }
});
// 重置路由
 export const resetRouter = () => {
   const routes = router.getRoutes();
   routes.forEach((item) => {
     if (!['Main', 'login','notFound'].includes(item.name as string)) {
       router.removeRoute(item.name as RouteRecordName);
     }
   });
   // console.log(newRouter);
 };
export default router;
