import tnRequest from '@/service';
import { obj } from '@/service/data';
import type { IDataType } from '@/service/types';
import type { IAccount } from './types';
enum LoginAPI {
  AccountLogin = '/ehr/api/a/login',
  getUsers = 'user/api/v2/user/me', //获取登录人的信息
  UserMenus = '/role/',
}
// 用户登录
export function accountLoginRequest(account: IAccount) {
  // return tnRequest.post<IDataType<ILoginResult>>({
  //   url: LoginAPI.AccountLogin,
  //   data: { appCode: 'edurp', ...account },
  //   interceptors: {
  //     responseInterceptor(res) {
  //       // 可以根据返回的数据进行判断和弹窗提示
  //       return res;
  //     },
  //   },
  // });
  return new Promise((resolve, reject) => {
    resolve({
      code: 20,
      body: {
        token: '111111111111111111',
      },
    });
  });
}
// 获取用户信息
export function getUsers() {
  // return tnRequest.get<IDataType>({
  //   url: LoginAPI.getUsers,
  //   showLoading: false,
  // });
  return new Promise((resolve, reject) => {
    resolve(obj);
  });
}
export function requestUserMenusByRoleId(id: number) {
  return tnRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false,
  });
}
