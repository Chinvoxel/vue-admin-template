import path from 'path'
import { loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// icon
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    base: env.VITE_APP_PUBLIC_PATH, // 开发或生产环境服务的公共基础路径
    plugins: [
      vue(),
      // 自动导入 JavaScript 模块插件
      AutoImport({
        imports: ['vue', 'vue-router', '@vueuse/core'],
        resolvers: [
          IconsResolver({
            prefix: 'Icon'
          }),
          ElementPlusResolver()
        ]
      }),
      // 自动导入并注册 Vue 组件插件
      Components({
        resolvers: [
          IconsResolver({
            enabledCollections: ['ep'] // 自动导入 Element Plus 组件中使用的图标
          }),
          ElementPlusResolver()
        ]
      }),
      Icons({
        autoInstall: true,
        compiler: 'vue3'
      })
    ],

    resolve: {
      // 别名
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@img': path.resolve(__dirname, 'src/assets/images/')
      },
      extensions: ['.js', '.ts', '.mjs', '.jsx', '.tsx', '.json', '.vue', '.scss', '.sass'] // 文件后缀拓展
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use '${path.resolve(__dirname, 'src/styles/mixin.scss')}' as *;` // 全局scss mixin
        }
      }
    },

    // 本地服务
    server: {
      port: 8889, // 端口号
      hmr: true, // 热更新
      // 代理
      proxy: {
        '/api': {
          target: env.VITE_APP_SERVER_API, // 使用环境变量
          changeOrigin: true, // 开启跨域
          rewrite: paths => paths.replace(/^\/api/, '')
        }
      }
    }
  })
}
