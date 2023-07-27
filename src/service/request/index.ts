import type { AxiosInstance } from 'axios';
import axios from 'axios';
import type { LoadingInstance } from 'element-plus/lib/components/loading/src/loading';
import type { TnRequestConfig, TnRequestConfigInterceptors } from './types';

import { ElLoading, ElMessage } from 'element-plus';
// 不引入css文件,会导致ElMessage不显示
import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-message.css';

const DEAFULT_LOADING = true;

class TnRequest {
  instance: AxiosInstance;
  interceptors?: TnRequestConfigInterceptors;
  showLoading: boolean;
  loading?: LoadingInstance;

  constructor(config: TnRequestConfig) {
    //  创建axios实例
    this.instance = axios.create(config);

    // 保存基本信息
    this.showLoading = config.showLoading ?? DEAFULT_LOADING;
    this.interceptors = config.interceptors;

    //  拦截器
    //  从config中取出对应实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch,
    );

    // 添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求。。。',
            background: 'rgba(0,0,0,0.5)',
          });
        }
        return config;
      },
      (err) => {
        return err;
      },
    );
    this.instance.interceptors.response.use(
      (res) => {
        //  移除loading
        this.loading?.close();

        const data = res.data;
        if (data.returnCode === '-1001') {
          console.log('响应失败~，错误信息');
        } else {
          return data;
        }
      },
      (err) => {
        //  将 loading 移除
        this.loading?.close();

        // 根据不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          ElMessage({
            message: '404',
          });
          // return Promise.reject('404');
        }
        return err;
      },
    );
  }
  request<T = any>(config: TnRequestConfig<T>): Promise<T> {
    return new Promise((resolve, rejects) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      //  关闭loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          this.showLoading = DEAFULT_LOADING;
          resolve(res);
        })
        .catch((err) => {
          this.showLoading = DEAFULT_LOADING;
          rejects(err);
          return err;
        });
    });
  }
  get<T = any>(config: TnRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }
  delete<T = any>(config: TnRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }
  post<T = any>(config: TnRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }
  put<T = any>(config: TnRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' });
  }
  patch<T = any>(config: TnRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }
}

export default TnRequest;
