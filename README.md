# Dogear 🐶

Webapp to manage bookmarks.

[_WIP!!!_](https://www.dictionary.com/browse/wip)

---
<details>
<summary>Setup development environment</summary>

#### Prerequisites:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) >= v20.0.0
- [Docker](https://www.docker.com/)
- [PnPm](https://pnpm.io/)

#### Local Database:

[How to use Supabase on a local development machine](https://supabase.com/docs/guides/cli/local-development)

#### Run Development:

###### Start database:

```bash
cd supabase
npx supabase start
```

###### Start project:

```bash
pnpm run dev
```
</details>

---
### Main Dependencies:

- [Astro](https://astro.build/)

  - [@astrojs/check](https://github.com/withastro/language-tools#readme)
  - [@astrojs/node](https://docs.astro.build/en/guides/integrations-guide/node/)

- [Typescript](https://www.typescriptlang.org/)

- [Vue.js](https://vuejs.org/)
  - [@astrojs/vue](https://docs.astro.build/en/guides/integrations-guide/vue/)

- [Supabase](https://github.com/supabase/supabase-js)
  - [Postgres](https://github.com/porsager/postgres)
  - [node-postgres/pg](https://github.com/brianc/node-postgres)
  - [Drizzle ORM](https://orm.drizzle.team/)

- [TailwindCSS](https://tailwindcss.com) / [shadcn-vue](https://www.shadcn-vue.com/)

  - [Astro TailwindCSS Integration](https://docs.astro.build/en/guides/integrations-guide/tailwind/)

  - [tailwind-merge](https://github.com/dcastil/tailwind-merge) for shadcn-vue
  - [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) for shadcn-vue
  - [class-variance-authority](https://github.com/joe-bell/cva#readme) for shadcn-vue
  - [clsx](https://github.com/lukeed/clsx#readme) for shadcn-vue
  - [lucide-vue-next](https://lucide.dev/) for shadcn-vue
  - [radix-vue](https://github.com/radix-vue/radix-vue) for shadcn-vue
  - [tanstack-vue-table](https://tanstack.com/table/latest) for shadcn-vue

- [dotenv](https://github.com/motdotla/dotenv#readme)

### Development Dependencies:

- [ESLint](https://eslint.org)

- [Typescript ESLint Plugin](https://github.com/typescript-eslint/typescript-eslint#readme)

- [Typescript ESLint Parser](https://github.com/typescript-eslint/typescript-eslint#readme)

- [ESLint Plugin Astro](https://ota-meshi.github.io/eslint-plugin-astro/)

- [Globals](https://github.com/sindresorhus/globals#readme)

- [Types Node](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/node)

- [Types Pg](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/pg)

- [Playwright Test](https://playwright.dev)

- [Vitest](https://github.com/vitest-dev/vitest#readme)

- [Happy DOM](https://github.com/capricorn86/happy-dom)

- [Vue Test Utils](https://github.com/vuejs/test-utils)

- [Supabase CLI](https://supabase.com/docs/reference/cli/start)

- [Drizzle-Kit](https://github.com/drizzle-team/drizzle-kit-mirror#readme)

- [Yup](https://github.com/jquense/yup)

- [Vee-Validate](https://github.com/logaretm/vee-validate/)
  - [Vee-Validate/Yup](https://vee-validate.logaretm.com/v4/guide/composition-api/typed-schema/)
