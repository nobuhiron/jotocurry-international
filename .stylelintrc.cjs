module.exports = {
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['dist/**', 'node_modules/**'],
  rules: {
    'at-rule-no-unknown': [true, { ignoreAtRules: ['custom-media'] }],
    'function-no-unknown': [true, { ignoreFunctions: ['fz'] }],
    'max-nesting-depth': 0,
    'declaration-property-value-disallowed-list': {
      transition: ['all'],
    },
    'color-no-hex': true,

    /* BEM 命名 (block__element__subelement--modifier) を許可 */
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*((__[a-z0-9]+(-[a-z0-9]+)*)+)?(--[a-z0-9]+(-[a-z0-9]+)*)?$',
      { resolveNestedSelectors: true },
    ],

    /* プロジェクトの慣習に合わせて無効化 */
    'import-notation': null,
    'custom-property-pattern': null,
    'block-no-empty': null,
    'rule-empty-line-before': null,
    'at-rule-empty-line-before': null,
    'no-descending-specificity': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'declaration-block-no-shorthand-property-overrides': null,
    'no-duplicate-selectors': null,
    'custom-property-empty-line-before': null,
    'comment-empty-line-before': null,
    'property-no-unknown': null,
    'selector-not-notation': null,
    'value-keyword-case': null,

    /* rgba / 小数の alpha を許可 */
    'color-function-notation': null,
    'alpha-value-notation': null,
    'color-function-alias-notation': null,

    /* PostCSS fz() 関数を許可 */
    'declaration-property-value-no-unknown': null,
  },
  overrides: [
    {
      files: ['src/styles/global/variables.css'],
      rules: {
        'color-no-hex': null,
      },
    },
  ],
};
