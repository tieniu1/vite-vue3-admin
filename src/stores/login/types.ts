import type { RouteRecordRaw } from 'vue-router';
export interface ILoginState {
  token: string;
  userInfo: any;
  permissions: string[];
}

export interface IUserInfo {
  permissions: Array<Record<string, any>>;
  [propName: string]: any;
}

export type objArray = Array<Record<string, any>>;

export interface ImapMenusToRoutesResult {
  firstMenu: any;
  routes: RouteRecordRaw[];
  buttonPermissions: string[];
}
