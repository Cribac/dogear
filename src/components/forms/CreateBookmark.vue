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

const props = defineProps({
  profileId: {
    type: String,
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
  const formData = buildFormData(values, props.profileId)

  const response = await fetch('/api/bookmark/create', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${PUBLIC_APP_API_TOKEN}`
    },
  })
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
            v-model="url"
            v-bind="urlAttrs"
            id="url"
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
            v-model="name"
            v-bind="nameAttrs"
            id="name"
            name="name"
            type="text"
          />
        </ErrorMessage>
      </CardContent>
      <CardFooter>
        <Button type="submit">Create bookmark</Button>
        <ErrorMessage 
          v-if="serverErrorMessage"
          :message="serverErrorMessage"
        />
      </CardFooter>
    </Card>
  </form>
</template>
