<script setup lang="ts">
import { onMounted, ref } from 'vue'

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
  const response = await fetch(`${props.site}/api/bookmark/all/${userId}.json`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const result = await response.json()

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
    Here be dragons
    <div 
      v-for="bookmark in bookmarkList"
      :key="bookmark.id"
      class="mb-4"  
    >
      {{ bookmark.name }}
    </div>
  </div>
</template>
