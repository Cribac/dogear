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
    ]
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  ...eslintPluginAstro.configs.recommended
]
