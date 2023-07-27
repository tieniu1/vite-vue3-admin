import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/

export default defineConfig({
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: '',
  //       secure: false, //关掉安全配置才能代理
  //       changeOrigin: true,
  //       rewrite: (path) => {
  //         return path.replace(/^\/apis/, '');
  //       },
  //     },
  //   },
  // },
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
