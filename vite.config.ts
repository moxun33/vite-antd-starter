/**
 * @type {import('vite').UserConfig}
 */
// @ts-ignore
// * No declaration file for less-vars-to-js
import lessToJS from 'less-vars-to-js';
import * as path from 'path';
import { defineConfig } from 'vite';
import vitePluginImp from 'vite-plugin-imp';
import react from '@vitejs/plugin-react';
import * as fs from 'fs';

// @ts-ignore
//import vitePluginMomentToDayjs from 'vite-plugin-moment-to-dayjs';
import antdDayjs from 'antd-dayjs-vite-plugin';

// @ts-ignore
import antdViteImportPlugin from 'antd-vite-import-plugin';

const pathResolver = (path: string) => _resolve(path);
const themeVariables = lessToJS(fs.readFileSync(pathResolver('./src/themes/base.less'), 'utf8'));
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
        target: 'http://jenkins.office.gz:8048',
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
  plugins: [
    antdDayjs(),
    react(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => {
            if (name === 'col' || name === 'row') {
              return 'antd/lib/style/index.less';
            }
            return `antd/es/${name}/style/index.less`;
          }
        }
      ]
    })
  ],
  define: {
    'process.env': process.env
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: themeVariables
      }
    }
  },
  optimizeDeps: {
    include: [
      'dayjs/locale/zh-cn',
      'antd/es/locale-provider/zh_CN',
      'dayjs/dayjs.min',
      'dayjs/plugin/isSameOrBefore',
      'dayjs/plugin/isSameOrAfter',
      'dayjs/plugin/advancedFormat',
      'dayjs/plugin/customParseFormat',
      'dayjs/plugin/weekday',
      'dayjs/plugin/weekYear',
      'dayjs/plugin/weekOfYear',
      'dayjs/plugin/isMoment',
      'dayjs/plugin/localeData',
      'dayjs/plugin/localizedFormat'
    ],
    esbuildOptions: {
      plugins: []
    }
  },
  resolve: {
    alias: {
      moment: 'dayjs',
      'rc-picker/es/generate/moment': 'rc-picker/es/generate/dayjs', //必须
      '@': _resolve('src'),
      public: _resolve('public')
    }
  }
});
