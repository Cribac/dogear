<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { bookmarkSchema } from '@/lib/forms/validators/bookmark'
import { buildFormData } from '@/lib/forms/helper'
import { fetchResponse } from '@/lib/connectivity'
import {
  Card,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ErrorMessage } from '@/components/forms'
import CategorySelection from '@/components/categories/CategorySelection.vue'

const props = defineProps<{
  // eslint-disable-next-line no-undef
  bookmark: Bookmark
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
}>()

const { bookmark } = props

const { PUBLIC_BASE_URL, PUBLIC_APP_API_TOKEN } = import.meta.env

const serverErrorMessage = ref('')

const { errors, handleSubmit, defineField } = useForm({
  initialValues: {
    name: bookmark.name,
    url: bookmark.url,
    categoryId: bookmark.category_id,
  },
  validationSchema: bookmarkSchema,
})

const [url, urlAttrs] = defineField('url')
const [name, nameAttrs] = defineField('name')
const [categoryId] = defineField('categoryId')


async function fetchCategories (userId: string, token: string) {
  const url = `${PUBLIC_BASE_URL}/api/category/all/${userId}.json`
  const response = await fetchResponse(url, 'GET', token)
  
  const result = await response.json()
  
  return result
}

const categories = await fetchCategories(bookmark.profileId, PUBLIC_APP_API_TOKEN)

const onSubmit = handleSubmit(async (values) => {
  // @TODO: there has to be a better way than this...
  const url = `${PUBLIC_BASE_URL}/api/bookmark/edit/${bookmark.id}.json`
  const formData = buildFormData(values)
  const response = await fetchResponse(url, 'PUT', PUBLIC_APP_API_TOKEN, formData)
  
  if (response.status !== 200) {
    const errorData = await response.json()
    serverErrorMessage.value = errorData.message
  } else {
    serverErrorMessage.value = ''
    const data = await response.json()
    const event = new CustomEvent('BookmarkEdited', { detail: data })
    window.dispatchEvent(event)
    emit('cancel')
  }
})
</script>

<template>
  <form @submit="onSubmit">
    <Card>
      <CardContent class="pt-4">
        <ErrorMessage
          :message="errors.name"
        >
          <Label for="name">Name</Label>
          <Input
            v-bind="nameAttrs"
            id="name"
            v-model="name"
            name="name"
            type="text"
          />
        </ErrorMessage>
        <ErrorMessage
          :message="errors.url"
          class="mt-4 mb-6"
        >
          <Label for="url">URL</Label>
          <Input
            v-bind="urlAttrs"
            id="url"
            v-model="url"
            name="url"
            type="url"
          />
        </ErrorMessage>
        <CategorySelection
          v-if="categories.length > 0"
          v-model="categoryId"
          name="categoryId"
          :categories="categories"
        />
      </CardContent>
      <CardFooter>
        <Button type="submit">
          Save Changes
        </Button>
        <Button @click="$emit('cancel')">
          Cancel
        </Button>
        <ErrorMessage 
          v-if="serverErrorMessage"
          :message="serverErrorMessage"
        />
      </CardFooter>
    </Card>
  </form>
</template>
