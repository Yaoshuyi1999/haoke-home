module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'array-callback-return': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'space-before-function-paren': 'off',
    'space-infix-ops': 'off',
    'no-case-declarations': 'off',
    'eslint-plugin-vue': 'off'
  }
}
