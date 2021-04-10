module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "airbnb-base"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "no-console": "off",
    // for linux users use unix instead of windows
    // for windows users
    "linebreak-style": ["error", "windows"],
    indent: ["error", 2],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-unused-vars": "off",
  },
};
