/**
 * @type {import('vite').UserConfig}
 */
// @ts-ignore
// * No declaration file for less-vars-to-js
import * as path from 'path';
import { defineConfig } from 'vite';
//import vitePluginImp from 'vite-plugin-imp';
import react from '@vitejs/plugin-react';

const pathResolver = (path: string) => _resolve(path);
function _resolve(dir: string) {
  return path.resolve(dir);
}
export default defineConfig({
  server: {
    port: 4444,
    host: '0.0.0.0',
    open: true,
    // https: true,
    proxy: {
      '/api': {
        target: 'http://m.office.gz:8048',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/bing': {
        target: 'http://cn.bing.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bing/, '')
      }
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        //生产环境时移除console.log()
        drop_console: true,
        drop_debugger: true
      },
      output: { comments: true }
    }
  },
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "@/styles/vars.less";`
      }
    }
  },
  optimizeDeps: {
    include: [],
    esbuildOptions: {
      plugins: []
    }
  },
  resolve: {
    alias: {
      dayjs: 'moment',
      '@': _resolve('src'),
      public: _resolve('public')
    }
  }
});
