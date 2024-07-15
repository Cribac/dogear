<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import {
  Card,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ErrorMessage } from '@/components/forms'
import { bookmarkSchema } from '@/lib/forms/validators/bookmark'
import { buildFormData } from '@/lib/forms/helper'
import { fetchResponse } from '@/lib/connectivity'

const props = defineProps({
  profileId: {
    type: String,
    default: () => '',
  },
})

const { PUBLIC_APP_API_TOKEN } = import.meta.env

const serverErrorMessage = ref('')

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: bookmarkSchema,
})

const [url, urlAttrs] = defineField('url')
const [name, nameAttrs] = defineField('name')

const onSubmit = handleSubmit(async (values) => {
  const url = '/api/bookmark/create'
  const formData = buildFormData(values, props.profileId)

  const response = await fetchResponse(url, 'POST', PUBLIC_APP_API_TOKEN, formData)

  if (response.status !== 200) {
    const errorData = await response.json()
    serverErrorMessage.value = errorData.message
  } else {
    serverErrorMessage.value = ''
    const data = await response.json()
    const event = new CustomEvent('BookmarkCreated', { detail: data })
    window.dispatchEvent(event)
  }
})
</script>

<template>
  <form @submit="onSubmit">
    <Card>
      <CardContent>
        <ErrorMessage
          :message="errors.url"
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

        <ErrorMessage
          :message="errors.name"
          class="mt-4"
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
      </CardContent>
      <CardFooter>
        <Button type="submit">
          Create bookmark
        </Button>
        <ErrorMessage 
          v-if="serverErrorMessage"
          :message="serverErrorMessage"
        />
      </CardFooter>
    </Card>
  </form>
</template>
