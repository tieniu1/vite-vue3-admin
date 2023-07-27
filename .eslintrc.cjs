/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // 关闭 组件名多字
    'vue/multi-word-component-names': 'off',
    // 开启 结尾分号,配合 prettier  "semi": true
    semi: ['error', 'always'],
    //开启 多行尾随逗号,配合 prettier  trailingComma:"es5"||"all"
    'comma-dangle': ['error', 'always-multiline'],
  },
};
