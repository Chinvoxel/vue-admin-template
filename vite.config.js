import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 自动导入 JavaScript 模块插件
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    // 自动导入并注册 Vue 组件插件
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],

  resolve: {
    // 别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@img': path.resolve(__dirname, 'src/assets/images/')
    },
    extensions: ['.vue', '.js', '.mjs', '.ts', '.jsx', '.tsx', '.json'] // 文件后缀拓展
  }
})
