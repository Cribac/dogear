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
      } 
    },
    ignores: [
      'dist/*',
      'node_modules/*',
      '.vscode '
    rules:       {
      'vue/multi-word-component-names': ['error', {
        'ignores': [
          'Button',
          'Card',
          'Checkbox',
          'Input',
          'Label',
          'Table'
        ]
      }]
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  ...eslintPluginAstro.configs.recommended
]
