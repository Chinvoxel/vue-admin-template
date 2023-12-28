import path from 'path'
import { loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import viteCompression from 'vite-plugin-compression2'
import visualizer from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    base: env.VITE_APP_PUBLIC_PATH, // 开发或生产环境服务的公共基础路径
    plugins: [
      vue(),
      // 自动导入 JavaScript 模块插件
      AutoImport({
        imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
        resolvers: [ElementPlusResolver()],
        dts: true,
        eslintrc: {
          enabled: false
        }
      }),

      // Element-UI 样式自动导入
      ElementPlus({
        importStyle: 'sass',
        useSource: true
      }),

      // 自动导入并注册 Vue 组件插件
      Components({
        resolvers: [ElementPlusResolver()]
      }),

      // 压缩
      viteCompression({
        algorithm: 'gzip', // 压缩算法
        threshold: 10240, // 体积大于阈值，则进行压缩，单位为b
        deleteOriginFile: false, // 压缩后是否删除源文件
        exclude: [/\.(br)$/, /\.(gz)$/]
      }),

      // 打包分析
      visualizer({
        open: true, // 构建完成后自动打开报告页面
        gzipSize: true, // 显示 Gzip 压缩后的包大小
        brotliSize: true // 显示 Brotli 压缩后的包大小
      })
    ],

    resolve: {
      // 别名
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@imgs': path.resolve(__dirname, 'src/assets/images/'),
        '@comps': path.resolve(__dirname, 'src/components/')
      },
      extensions: ['.js', '.ts', '.mjs', '.jsx', '.tsx', '.json', '.vue'] // 文件后缀拓展
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use '${path.resolve(__dirname, 'src/styles/mixin.scss')}' as *;
          @use "${path.resolve(__dirname, 'src/styles/variables.scss')}" as *;
          `
        }
      }
    },

    optimizeDeps: {
      include: [], // 预加载
      exclude: ['vue'], // 排除 vue 模块的优化
      entries: ['vue'] // 将 vue 打包为单独的块
    },

    // 打包
    build: {
      chunkSizeWarningLimit: 1600, // 触发警告的 chunk 大小
      rollupOptions: {
        external: [], // 指定外部依赖模块

        output: {
          chunkFileNames: 'static/js1/[name]-[hash].js', // 设置输出的 chunk 文件名
          entryFileNames: 'static/js2/[name]-[hash].js', // 设置输出的入口文件名
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]', // 设置输出的资源文件名
          // 分包 减小main.js体积
          manualChunks: filePath => {
            if (filePath.includes('node_modules')) {
              const arr = filePath.toString().split('node_modules/')[1].split('/')
              const pack = ['vue', 'vue-router']
              if (pack.includes(arr[0])) {
                return `_${arr[0]}` // 将指定的包分割为单独的 chunk
              }
              return '__vendor' // 其他第三方包统一打包到一个 chunk
            }
            return '__vendor' // 非第三方包统一打包到一个 chunk
          }
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
