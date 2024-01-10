## 技术栈

vue3 + vite + element-plus + pinia + js + node(v18.15.0) + pnpm

## 推荐安装的vscode插件

1. vue-vscode-snippets : 页面输入vb,生成vue页面模板
2. Volar : 提升vue3的开发体验

## 第三方依赖

1. axios 封装
2. element-plus 组件库
3. pinia 状态管理
4. vue-router 路由管理
5. @vueuse/core 常用hooks方法
6. rollup-plugin-visualizer 打包分析
7. vite-plugin-compression2 打包压缩
8. unplugin-auto-import/vite 自动导入API
9. unplugin-vue-components/vite 自动导入组件

## eslint

vue-scoped-css 插件 确保 scoped 样式的正确使用

## 项目功能

1. 封装vue 插件管理项目enum枚举

### 国际化(i18n)

1. 在template模板中使用

```js
$t('route.dashboard')
```

2. 在 setup 中使用

```js
// import { useI18n } from 'vue-i18n' // 已自动导入 无需手动导入
const { t } = useI18n() // 解构出t方法
const xxx = t('route.dashboard')
```

3. js文件中使用

```js
import i18n from '@/lang' // 引入i8n实例
i18n.global.t('route.dashboard')
```

## 项目架构

-- src
-- api 接口统一定义管理
-- assets 静态资源
-- components 公共组件
-- config 项目配置文件
-- enums 枚举统一定义管理 (vue插件化集成)
-- layout 页面公共布局
-- request 封装axios请求
-- router 路由定义管理
-- store 全局状态管理
-- styles 全局样式管理
-- utils 公共工具方法库
-- views 页面文件管理

### 注

1. 请勿更新依赖包中的typescript版本
   https://github.com/nuxt/nuxt/discussions/22284
