// 根据 import.meta.env.MODE 区分
// 开发环境: development
// 生成环境: production
// 测试环境: test

let BASE_URL = '';
const TIME_OUT = 10000;

if (import.meta.env.MODE === 'development') {
  BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  // BASE_URL = '/api';
} else if (import.meta.env.MODE === 'production') {
  BASE_URL = import.meta.env.VITE_APP_BASE_URL;
} else {
  BASE_URL = '';
}

export { BASE_URL, TIME_OUT };
