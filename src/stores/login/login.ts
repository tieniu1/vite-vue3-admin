import router, { resetRouter } from '@/router';
import { accountLoginRequest, getUsers } from '@/service/login/login';
import type { IAccount } from '@/service/login/types';
import type { IUserInfo, objArray } from '@/stores/login/types';
import LocalCache from '@/utils/cache';
import { mapMenusToRoutes } from '@/utils/mapMenu';
import { ElMessage } from 'element-plus';
import { defineStore } from 'pinia';

import { ref } from 'vue';

export const useLoginStore = defineStore('login', () => {
  const token = ref('');
  const userInfo = ref<IUserInfo>({ permissions: [{}] });
  const rawPermissions = ref<objArray>([]);
  //按扭权限
  const btnPermissions = ref<string[]>([]);

  /**
   * @description: 登录
   * @param {IAccount} form
   * @return {*}
   */
  const loginFn = async (form: IAccount) => {
    try {
      const results = await accountLoginRequest(form);
      console.log('results--------', results);

      const tokenStr = results.body.tokenType + ' ' + results.body.token;
      // 存储toke
      token.value = tokenStr;
      LocalCache.setCache('token', tokenStr);
      // 请求用户信息,获取权限,设置菜单和权限按扭
      await getUserInfo();
      // 跳转到main
      router.push('/main');
    } catch (error) {
      console.log(error);

      ElMessage({
        message: '登陆错误',
      });
    }
  };

  /**
   * @description: 请求用户信息,获取权限,设置菜单和权限按扭
   * @param {any} payload
   * @return {*}
   */
  const getUserInfo = async (payload?: any) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      // 没有token不能获取用户信息
      if (!token.value) return;
      // 获取用户信息
      const userInfoResult = await getUsers();
      userInfo.value = userInfoResult.body;
      LocalCache.setCache('edurpUserInfo', userInfo);

      // 格式化权限列表 动态添加路由
      changeUserMenus(userInfo.value.permissions);

      // 存储后台返回的权限列表
      LocalCache.setCache('rawPermissions', userInfo.value.permissions);
      rawPermissions.value = userInfo.value.permissions;
      resolve(undefined);
    });
  };

  /**
   * @description: 格式化权限列表,动态添加路由,设置菜单
   * @param {IUserInfo} userMenus
   * @return {*}
   */
  const changeUserMenus = (userMenus: IUserInfo[`permissions`]) => {
    // 清空路由
    resetRouter();
    // 动态注册路由
    const { routes, buttonPermissions, firstMenu } = mapMenusToRoutes(userMenus);
    for (const route of routes) {
      // 把路由注册为main的的子路由,动态加载的路由都会在main.vue的router-view展示
      router.addRoute('main', route);
    }
    LocalCache.setCache('firstMenu', firstMenu);

    // console.log('动态注册路由routes-----', routes);
    // console.log('获取全部routes----', router.getRoutes());

    btnPermissions.value = buttonPermissions;
  };
  // 数据持久化
  const setupStore = async () => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const localToken = LocalCache.getCache('token');
      if (localToken) {
        token.value = localToken;
        await getUserInfo();
      }
      resolve(undefined);
    });
  };
  // 退出登陆
  const logOutFn = () => {
    LocalCache.clearCache();
    token.value = '';
    userInfo.value = { permissions: [{}] };
    rawPermissions.value = [];
    btnPermissions.value = [];
    resetRouter();
    router.replace('/login');
  };
  return { loginFn, logOutFn, setupStore, userInfo, rawPermissions, btnPermissions };
});
