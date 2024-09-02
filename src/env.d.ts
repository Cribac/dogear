// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_API_URL: string
  readonly PUBLIC_SUPABASE_DB_URL: string
  readonly PUBLIC_SUPABASE_KEY: string
  readonly PUBLIC_APP_API_TOKEN: string
  readonly PUBLIC_ENABLE_REGISTRATION: string
  readonly PUBLIC_BASE_URL: string
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
  category_id?: string
  category_name?: string
}

interface Bookmarks {
  bookmarks: Bookmark[]
}

interface Category {
  id: string
  profileId: string
  name: string
  bookmark_count: number
  created_at: Date | null
  updated_at: Date | null
}

type AvatarColor = 'pink' | 'peach' |'yellow' | 'teal' | 'sapphire' | 'sky' | 'lavender'

type CustomEventName =
  'bookmark:create' |
  'bookmark:update' |
  'bookmark:delete' |
  'category:create' |
  'category:update' |
  'category:delete' |
  'visibility:toggle'

interface CustomEventNames {
  [key: string]: CustomEventName
}
