/** @type {import('stylelint').Config} */

export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'at-rule-no-deprecated': [true, { ignoreAtRules: ['apply'] }],
    'color-hex-length': 'long',
  },
};
