import 'virtual:uno.css';
import './assets/main.less';

// import { useLoginStore } from '@/stores/login/login';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
console.log('main执行那个了吗');

app.mount('#app');

// const { setupStore } = useLoginStore();

// setupStore();
