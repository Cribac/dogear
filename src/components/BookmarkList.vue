<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchResponse } from '@/lib/connectivety'
import BookmarkItem from '@/components/BookmarkItem.vue'

const props = defineProps({
  userId: {
    type: String,
    required: true
  },
  site: {
    type: String
  }
})

const { PUBLIC_APP_API_TOKEN } = import.meta.env

const bookmarkList = ref()

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

  // @ts-expect-error don't want to type events for now
  window.addEventListener('BookmarkCreated', async (e: CustomEvent) => {
    console.log('BookmarkCreated', e.detail)
    bookmarkList.value = await fetchBookmarks(props.userId, PUBLIC_APP_API_TOKEN)
  })
})
</script>

<template>
  <div id="bookmarks">
    <BookmarkItem
      v-for="bookmark in bookmarkList"
      :key="bookmark.id"
      :bookmark="bookmark"
      @deleteBookmark="deleteBookmark"
      class="mb-4"
    />  
  </div>
</template>
