/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_API_URL: string
  readonly PUBLIC_SUPABASE_DB_URL: string
  readonly PUBLIC_SUPABASE_KEY: string
  readonly PUBLIC_APP_API_TOKEN: string
  readonly PUBLIC_ENABLE_REGISTRATION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Bookmark {
  url: string | undefined
  id: string
  name: string | undefined
  created_at: Date | null
  updated_at: Date | null
  profileId: string
}

interface Bookmarks {
  bookmarks: Bookmark[]
}
