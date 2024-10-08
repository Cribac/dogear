<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Bookmark } from '@/env'
import { fetchResponse } from '@/lib/connectivity'
import { customEventNames } from '@/lib/eventNames'
import { columns } from '@/components/bookmarks/columns'
import { Input } from '@/components/ui/input'
import { DataTable } from '@/components/ui/data-table'
import { DeleteButton } from '@/components/ui/button'
import EditBookmark from '@/components/forms/EditBookmark.vue'

const props = defineProps({
  userId: {
    type: String,
    required: true
  }
})

const { PUBLIC_APP_API_TOKEN, PUBLIC_BASE_URL } = import.meta.env

const bookmarkList = ref<Bookmark[]>([])

async function fetchBookmarks (userId: string, token: string) {
  const url = `${PUBLIC_BASE_URL}/api/bookmark/all/${userId}.json`
  const response = await fetchResponse(url, 'GET', token)

  const result = await response.json()

  return result
}

/**
 * Resets and refetches the bokmark list, to ensure the table is up-to-date
 */
 async function resetAndRefetch(): Promise<void> {
  bookmarkList.value = []
  bookmarkList.value = await fetchBookmarks(props.userId, PUBLIC_APP_API_TOKEN)
}

/**
 * Deletes a bookmark
 */
async function deleteBookmark (id: string) {
  const url = `${PUBLIC_BASE_URL}/api/bookmark/delete/${id}.json`
  const response = await fetchResponse(url, 'DELETE', PUBLIC_APP_API_TOKEN)

  const result = await response.json()

  return result
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleBulkDelete (rows: any[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ids = rows.map((row: { original: { id: any } }) => row.original.id)
  const url = `${PUBLIC_BASE_URL}/api/bookmark/delete/deleteAll.json`

  const response = await fetchResponse(url, 'DELETE', PUBLIC_APP_API_TOKEN, JSON.stringify(ids))

  const result = await response.json()
  bookmarkList.value = await fetchBookmarks(props.userId, PUBLIC_APP_API_TOKEN)
  return result
}

onMounted(async () => {
  bookmarkList.value = await fetchBookmarks(props.userId, PUBLIC_APP_API_TOKEN)

  window.addEventListener(customEventNames.bookmarkCreate, async () => {
    await resetAndRefetch()
  })

  // @ts-expect-error don't want to type events for now
  window.addEventListener(customEventNames.bookmarkDelete, async (e: CustomEvent) => {
    await deleteBookmark(e.detail)
    await resetAndRefetch()
  })

  window.addEventListener(customEventNames.bookmarkUpdate, async () => {
    await resetAndRefetch()
  })
})
</script>

<template>
  <div id="bookmarks">
    <DataTable
      :columns="columns"
      :data="bookmarkList"
    >
      <template #filters="filtersProps">
        <div class="flex flex-1 items-center justify-between py-4">
          <div class="flex items-center py-4">
            <Input
              :model-value="filtersProps.table.getColumn('name')?.getFilterValue() as string"
              class="max-w-sm"
              placeholder="Filter by name..."
              @update:model-value="filtersProps.table.getColumn('name')?.setFilterValue($event)" 
            />
          </div>

          <div class="flex flex-1 items-center py-4 ml-4">
            <Input
              :model-value="filtersProps.table.getColumn('category_name')?.getFilterValue() as string"
              class="max-w-sm"
              placeholder="Filter by category..."
              @update:model-value="filtersProps.table.getColumn('category_name')?.setFilterValue($event)" 
            />
          </div>

          <div
            v-if="filtersProps.table.getSelectedRowModel().rows.length > 0"
            class="flex justify-end items-center py-4 mr-4"
          >
            <DeleteButton
              button-text="Delete Selected"
              @delete="handleBulkDelete(filtersProps.table.getSelectedRowModel().rows)"
            />
          </div>
        </div>
      </template>

      <template #edit="editProps">
        <EditBookmark
          :bookmark="editProps.row.original"
          @cancel="editProps.row.toggleExpanded()" 
        />
      </template>
    </DataTable>
  </div>
</template>
