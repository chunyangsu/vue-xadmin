module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 方法后面的()前不加空格
    "space-before-function-paren": 0,
    //引号类型 `` "" ''
    "quotes": [1, "single"],
    // 缩进配置
    "indent": ["off", 2],
    // 允许 == 或 !=
    "eqeqeq": ["off"],
    //配置camelcase选项
    "camelcase": [0, {
      properties: 'always'
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [{
    files: [
      '**/__tests__/*.{j,t}s?(x)',
      '**/tests/unit/**/*.spec.{j,t}s?(x)'
    ],
    env: {
      jest: true
    }
  }]
}
