module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/standard'
  ],
  globals: {
    'Vue': true,
    'VueRouter': true,
    'Vuex': true,
    'axios': true,
    'antd': true,
    '_': true,
    'moment': true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-empty': 'off',
    'prefer-promise-reject-errors': 'off'
  }
}
