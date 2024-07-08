import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import tailwind from '@astrojs/tailwind'
import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue({
      appEntrypoint: './src/pages/app',
    }), 
    tailwind()
  ],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  site: 'http://localhost:4321'
})
