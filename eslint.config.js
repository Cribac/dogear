import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"
import eslintPluginAstro from "eslint-plugin-astro"

export default [
  {
    languageOptions: { 
      globals: {
        ...globals.browser, 
        ...globals.node
      }, 
      parserOptions: {
        parser: '@typescript-eslint/parser'
      },
    },
    ignores: [
      'dist/*',
      'node_modules/*',
      '.vscode '
    ],
    rules:       {
      'vue/multi-word-component-names': ['error', {
        'ignores': [
          'Button',
          'Card',
          'Checkbox',
          'Input',
          'Label',
          'Table',
          'Select'
        ]
      }]
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/base"],
  ...pluginVue.configs["flat/essential"],
  ...pluginVue.configs["flat/recommended"],
  ...eslintPluginAstro.configs.recommended
]
