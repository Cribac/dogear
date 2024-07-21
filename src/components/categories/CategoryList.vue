<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchResponse } from '@/lib/connectivity'
import { columns } from '@/components/categories/columns'
import { Input } from '@/components/ui/input'
import DataTable from '@/components/DataTable.vue'
import EditCategory from '@/components/forms/EditCategory.vue'

const props = defineProps({
  userId: {
    type: String,
    required: true
  },
})

const { PUBLIC_APP_API_TOKEN, PUBLIC_BASE_URL } = import.meta.env

// eslint-disable-next-line no-undef
const categoryList = ref<Category[]>([])

async function fetchCategories (userId: string, token: string) {
  const url = `${PUBLIC_BASE_URL}/api/category/all/${userId}.json`
  const response = await fetchResponse(url, 'GET', token)

  const result = await response.json()

  return result
}

async function deleteCategory (id: string) {
  const url = `${PUBLIC_BASE_URL}/api/category/delete/${id}.json`
  const response = await fetchResponse(url, 'DELETE', PUBLIC_APP_API_TOKEN)

  const result = await response.json()

  categoryList.value = await fetchCategories(props.userId, PUBLIC_APP_API_TOKEN)
  
  return result
}

onMounted(async () => {
  categoryList.value = await fetchCategories(props.userId, PUBLIC_APP_API_TOKEN)

  // @TODO harden this
  // @TODO: there has to be a better way than this...
  // @ts-expect-error don't want to type events for now
  window.addEventListener('CategoryCreated', async (e: CustomEvent) => {
    console.log('CategoryCreated', e.detail)
    categoryList.value = await fetchCategories(props.userId, PUBLIC_APP_API_TOKEN)
  })

  // @TODO harden this
  // @TODO: there has to be a better way than this...
  // @ts-expect-error don't want to type events for now
  window.addEventListener('DeleteCategory', async (e: CustomEvent) => {
    console.log('DeleteCategory', e.detail)
    await deleteCategory(e.detail)
    categoryList.value = await fetchCategories(props.userId, PUBLIC_APP_API_TOKEN)
  })

    // @TODO harden this
    // @TODO: there has to be a better way than this...
  // @ts-expect-error don't want to type events for now
  window.addEventListener('CategoryEdited', async (e: CustomEvent) => {
    console.log('CategoryEdited', e.detail)
    categoryList.value = await fetchCategories(props.userId, PUBLIC_APP_API_TOKEN)
  })
})
</script>

<template>
  <div id="bookmarks">
    <DataTable 
      :columns="columns" 
      :data="categoryList" 
    >
      <template #filters="filtersProps">
        <div class="flex items-center py-4">
          <div class="flex items-center py-4">
            <Input
              :model-value="filtersProps.table.getColumn('name')?.getFilterValue() as string"
              class="max-w-sm"
              placeholder="Filter by name..."
              @update:model-value="filtersProps.table.getColumn('name')?.setFilterValue($event)" 
            />
          </div>
        </div>
      </template>

      <template #edit="editProps">
        <EditCategory
          :category="editProps.row.original"
          @cancel="editProps.row.toggleExpanded()" 
        />
      </template>
    </DataTable>
  </div>
</template>
