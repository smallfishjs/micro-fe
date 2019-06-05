module.exports = {
  extends: [
    'eslint-config-antife',
  ],
  env: {
    "browser": true
  },
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint/eslint-plugin"
  ],
  rules: {
    "no-duplicate-imports": 0,
  }
};