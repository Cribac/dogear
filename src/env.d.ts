/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_API_URL: string
  readonly PUBLIC_SUPABASE_KEY: string
  readonly PUBLIC_ENABLE_REGISTRATION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
