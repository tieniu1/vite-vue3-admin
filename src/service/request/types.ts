import type { AxiosRequestConfig, AxiosResponse } from 'axios';
// 拓展config类型
// 增加interceptors
export interface TnRequestConfigInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}

export interface TnRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: TnRequestConfigInterceptors<T>;
  showLoading?: boolean;
}
