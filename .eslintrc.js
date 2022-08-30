module.exports = {
  settings: {
    react: {
      version: '18.0',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    },
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'js': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never'
      }
   ]
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig-eslint.json',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'react/require-default-props': 'off',
    'class-methods-use-this': 'off',
    'max-len': [
      'error',
      180,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'lines-between-class-members': [
      'error',
      'always',
      { 'exceptAfterSingleLine': true },
    ],
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { 'exceptAfterSingleLine': true },
    ],
    '@typescript-eslint/indent': ['error', 2, { 'SwitchCase': 1, 'ignoredNodes': ['PropertyDefinition'] }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': [2, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/comma-spacing': 'off',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'no-redeclare': 'off',
    'import/export': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-props-no-spreading': 'off',
    'import/extensions': 'off',
    'key-spacing': 'off',
    'no-multi-spaces': ['off', { exceptions: { 'VariableDeclarator': true, 'ImportDeclaration': true, 'Property': true } }],
    'space-in-parens': 'off',
    'react/no-array-index-key': 'off',
    'key-spacing': [2, { "align": "colon", "beforeColon": false, "afterColon": true }],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
      },
    ], 
  },
};