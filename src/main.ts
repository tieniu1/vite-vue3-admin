import 'virtual:uno.css';
import './assets/main.less';

import { useLoginStore } from '@/stores/login/login';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
const { setupStore } = useLoginStore();
/**
 * 通过await保证动态添加路由之后,再执行app.use(router);,避免路由跳转到的页面为注册,导致白屏或者被notfound的捕获跳转到notfound页面.
 * 刷新重新获取数据,渲染菜单,动态添加路由
 * */
await setupStore();

app.use(router);

app.mount('#app');
