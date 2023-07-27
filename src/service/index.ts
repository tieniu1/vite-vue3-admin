import LocalCache from '@/utils/cache';
import TnRequest from './request';
import { BASE_URL, TIME_OUT } from './request/config';
console.log(BASE_URL);

export default new TnRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor(config) {
      // 携带token的拦截
      const token = LocalCache.getCache('token');
      if (!config.headers) {
        config.headers = {};
      }
      if (token) {
        config.headers.Authorization = token;
      }
      config.headers['default-role-type'] = 2;
      config.headers['customer-id'] = 'YIJIE_2017_FAKE';

      return config;
    },
    requestInterceptorCatch(error) {
      return Promise.reject(error);
    },
    responseInterceptor(res) {
      return res;
    },
    responseInterceptorCatch(error) {
      return Promise.reject(error);
    },
  },
});
