module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'linebreak-style': [
      'error',
      'unix'
    ],
    'no-unused-vars': [
      'warn'
    ],
    'react/prop-types': 0

  }
}
