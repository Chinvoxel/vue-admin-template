module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true
  },

  // 指定一个解析器
  parser: 'vue-eslint-parser', // 专为解析 Vue 单文件组件而设计的解析器。
  /* 优先级低于parse的语法解析配置 */
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module' // 模块化方案
  },

  // 拓展
  extends: [
    'plugin:import/recommended',
    'plugin:vue/vue3-recommended',
    'airbnb-base',
    'plugin:prettier/recommended',
    './.eslintrc-auto-import.json'
  ],
  // 插件
  plugins: ['vue', 'vue-scoped-css', 'import'],

  /* 指定应该在其所有规则中共享的信息 */
  settings: {
    // 解决后缀忽略不识别问题
    'import/resolver': {
      // 解析npm包依赖
      node: {
        moduleDirectory: ['node_modules', 'src'],
        extensions: ['.js', '.jsx', '.vue', '.json']
      },
      alias: {
        map: [
          ['@', './src'],
          ['@imgs', './src/assets/images'],
          ['@comps', './src/components']
        ],
        extensions: ['.js', '.jsx', '.vue']
      }
    }
  },

  /**
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    /* VUE */
    'vue/comment-directive': 'off', // 支持在模版中使用 eslint-disable-next-line 等注释
    'vue/no-multiple-template-root': 'off', // 关闭多根节点检测
    'vue/multi-word-component-names': 'off', // 关闭单文件组件名必须多个单词的限制
    // vue 属性排序
    'vue/attributes-order': 'off',

    /* css */
    'vue-scoped-css/require-scoped': 'error', // 确保 scoped 样式的正确使用

    /* JS */
    'no-use-before-define': 'off', // vue项目允许先定义方法后使用
    'no-console': 'off', // 打印警告
    'no-restricted-syntax': 'off', // 关闭禁用for-in for-of的规则
    'no-param-reassign': ['error', { props: false }], // 禁止直接赋值函数的入参
    'no-underscore-dangle': 'off', // 关闭不允许下划线做前缀
    'prefer-destructuring': 'off', // 对象、数组不强制解构

    /* another */
    'import/prefer-default-export': 'off', // 关闭推荐export default
    'import/no-extraneous-dependencies': ['off', { devDependencies: true }], // 关闭错误提示开发依赖需安装为生产依赖
    'import/no-cycle': 'off', // 循环依赖检测

    // 依赖导入顺序
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling']]
        // 'newlines-between': 'always' 模块分组是否需要空行
      }
    ],

    // 解决后缀忽略不识别问题
    'import/extensions': [
      'error',
      {
        js: 'never',
        jsx: 'never',
        vue: 'always',
        less: 'always'
      }
    ]
  }
}
