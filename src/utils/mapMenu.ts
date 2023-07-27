import { allRoutes } from '@/router/allRoute';
import type { IUserInfo, ImapMenusToRoutesResult, objArray } from '@/stores/login/types';
import type { RouteRecordRaw } from 'vue-router';

// 格式化权限,返回注册路由格式的数据
export const mapMenusToRoutes = (userMenus: IUserInfo[`permissions`]): ImapMenusToRoutesResult => {
  // 默认菜单
  let firstMenu: any = null;
  // 按扭权限
  const buttonPermissions: string[] = [];
  // 整理好的路由
  const routes: RouteRecordRaw[] = [];
  const _recursionGetRoute = (children: objArray) => {
    children.forEach((menu) => {
      if (menu.levels !== 1) {
        allRoutes.forEach((route) => {
          if (route.path === menu.url) {
            if (!firstMenu) {
              firstMenu = menu;
            }
            routes.push({ ...route });
          }
        });
        if (/^button:/.test(menu.url)) {
          buttonPermissions.push(menu.url);
        }
        if (menu.children?.length >= 0) {
          _recursionGetRoute(menu.children);
        }
      } else if (menu.levels == 1 && menu.children?.length >= 0) {
        _recursionGetRoute(menu.children);
      }
    });
  };
  _recursionGetRoute(userMenus);
  console.log({ firstMenu, routes, buttonPermissions });

  return { firstMenu, routes, buttonPermissions };
};
