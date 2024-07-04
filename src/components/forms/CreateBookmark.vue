<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ErrorMessage } from '@/components/forms'
import { bookmarkSchema } from '@/lib/forms/validators/bookmark'
import { buildFormData } from '@/lib/forms/helper'

// @TODO: check if there's a better way to do this
const props = defineProps({
  accessToken: {
    type: String,
    required: true,
  }
})

const serverErrorMessage = ref('')

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: bookmarkSchema,
})

const [url, urlAttrs] = defineField('url')
const [name, nameAttrs] = defineField('name')

const onSubmit = handleSubmit(async (values) => {
  const formData = buildFormData(values)

  const response = await fetch('/api/bookmark/create', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${props.accessToken}`,
    },
  })
  if (response.status !== 200) {
    const data = await response.json()
    serverErrorMessage.value = data.message
  } else {
    serverErrorMessage.value = ''
  }
})
</script>

<template>
  <form @submit="onSubmit">
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
    <Button type="submit">Create bookmark</Button>
  </form>
  <ErrorMessage 
    v-if="serverErrorMessage"
    :message="serverErrorMessage"
  />
</template>
