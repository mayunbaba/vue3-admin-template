import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
/**
 * 自动引入图标组件，官网好像未开放此权限，暂时无法使用
 */
// import Icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'
// import Inspect from 'vite-plugin-inspect'

const pathSrc = path.resolve(__dirname, 'src');

export default defineConfig({
  resolve: {
    alias: {
      '@': pathSrc,
    },
  },
  plugins: [
    Vue(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],

      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),

        // Auto import icon components
        // 自动导入图标组件
        // IconsResolver({
        //   prefix: 'Icon',
        // }),
      ],

      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),

    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        // IconsResolver({
        //   enabledCollections: ['ep'],
        // }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
      ],

      dts: path.resolve(pathSrc, 'components.d.ts'),
    }),

    // Icons({
    //   autoInstall: true,
    // }),

    // Inspect(),
  ],
  server: {
    proxy: {
      '/api': {
        // target: 'http://localhost:1337',
        target: 'http://localhost:7001',
        // rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
      '/admin': {
        // target: 'http://localhost:1337',
        target: 'http://localhost:7001',
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
});
