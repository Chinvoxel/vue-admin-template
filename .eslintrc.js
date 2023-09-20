module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  // 指定一个解析器
  parser: 'vue-eslint-parser', // 专为解析 Vue 单文件组件而设计的解析器。
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  // 拓展
  extends: ['plugin:vue/essential', 'airbnb-base', 'plugin:prettier/recommended'], // 使用airbnb规范
  // 插件
  plugins: ['vue', 'vue-scoped-css'],

  settings: {
    // 解决后缀忽略不识别问题
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
      }
    }
  },
  // 自定义规则
  rules: {
    /* VUE */
    'vue/comment-directive': 'off', // 支持在模版中使用 eslint-disable-next-line 等注释
    'vue/no-multiple-template-root': 'off', // 关闭多根节点检测
    'vue/multi-word-component-names': 'off', // 关闭单文件组件名必须多个单词的限制
    /* css */
    'vue-scoped-css/require-scoped': 'error', // 确保 scoped 样式的正确使用
    /* another */
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }], // 关闭错误提示开发依赖需安装为生产依赖
    // 解决无法识别vite别名导致的错误
    'import/no-unresolved': [
      'error',
      {
        ignore: ['^@']
      }
    ]
  }
}
