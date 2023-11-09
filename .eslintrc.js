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
  /* 拓展 */
  extends: ['plugin:import/recommended', 'plugin:vue/vue3-recommended', 'airbnb-base', 'plugin:prettier/recommended'],
  // 插件
  plugins: ['vue', 'vue-scoped-css', 'eslint-plugin-import'],

  settings: {
    // 解决后缀忽略不识别问题
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.json', '.scss']
      },
      alias: {
        map: [
          ['@', './src'],
          ['@img', './src/assets/images/']
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.scss']
      }
    }
  },
  // 自定义规则
  rules: {
    /* VUE */
    'vue/comment-directive': 'off', // 支持在模版中使用 eslint-disable-next-line 等注释
    'vue/no-multiple-template-root': 'off', // 关闭多根节点检测
    'vue/multi-word-component-names': 'off', // 关闭单文件组件名必须多个单词的限制
    'vue/attributes-order': 'off', // 关闭key值应该在属性前

    /* css */
    'vue-scoped-css/require-scoped': 'error', // 确保 scoped 样式的正确使用

    /* JS */
    'no-use-before-define': 'off', // vue项目允许先定义方法后使用
    'no-console': 'off', // 打印警告
    'no-restricted-syntax': 'off', // 关闭禁用for-in for-of的规则
    'no-param-reassign': ['error', { props: false }], // 关闭禁止直接修改函数的入参
    'no-underscore-dangle': 'off', // 关闭不允许下划线做前缀
    // 对象、数组不强制解构
    'prefer-destructuring': 'off',

    /* another */
    'import/prefer-default-export': 'off', // 关闭推荐export default
    'import/no-extraneous-dependencies': ['off', { devDependencies: true }], // 关闭错误提示开发依赖需安装为生产依赖
    'import/no-cycle': 'off', // 循环依赖检测
    // 解决后缀忽略不识别问题
    'import/extensions': [
      'error',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        vue: 'always',
        scss: 'always'
      }
    ]
  }
}
