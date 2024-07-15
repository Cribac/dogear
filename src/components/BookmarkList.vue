<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchResponse } from '@/lib/connectivity'
import { columns } from '@/components/bookmarks/columns'
import DataTable from '@/components/bookmarks/DataTable.vue'

const props = defineProps({
  userId: {
    type: String,
    required: true
  },
  site: {
    type: String,
    required: true
  }
})

const { PUBLIC_APP_API_TOKEN } = import.meta.env

// eslint-disable-next-line no-undef
const bookmarkList = ref<Bookmark[]>([])

async function fetchBookmarks (userId: string, token: string) {
  const url = `${props.site}/api/bookmark/all/${userId}.json`
  const response = await fetchResponse(url, 'GET', token)

  const result = await response.json()

  return result
}

async function deleteBookmark (id: string) {
  const url = `${props.site}/api/bookmark/delete/${id}.json`
  const response = await fetchResponse(url, 'DELETE', PUBLIC_APP_API_TOKEN)

  const result = await response.json()

  bookmarkList.value = await fetchBookmarks(props.userId, PUBLIC_APP_API_TOKEN)
  
  return result
}

onMounted(async () => {
  bookmarkList.value = await fetchBookmarks(props.userId, PUBLIC_APP_API_TOKEN)

  // @TODO harden this
  // @TODO: there has to be a better way than this...
  // @ts-expect-error don't want to type events for now
  window.addEventListener('BookmarkCreated', async (e: CustomEvent) => {
    console.log('BookmarkCreated', e.detail)
    bookmarkList.value = await fetchBookmarks(props.userId, PUBLIC_APP_API_TOKEN)
  })

  // @TODO harden this
  // @TODO: there has to be a better way than this...
  // @ts-expect-error don't want to type events for now
  window.addEventListener('DeleteBookmark', async (e: CustomEvent) => {
    console.log('DeleteBookmark', e.detail)
    await deleteBookmark(e.detail)
    bookmarkList.value = await fetchBookmarks(props.userId, PUBLIC_APP_API_TOKEN)
  })

    // @TODO harden this
    // @TODO: there has to be a better way than this...
  // @ts-expect-error don't want to type events for now
  window.addEventListener('BookmarkEdited', async (e: CustomEvent) => {
    console.log('BookmarkEdited', e.detail)
    bookmarkList.value = await fetchBookmarks(props.userId, PUBLIC_APP_API_TOKEN)
  })
})
</script>

<template>
  <div id="bookmarks">
    <DataTable 
      :columns="columns" 
      :data="bookmarkList" 
    />
  </div>
</template>
