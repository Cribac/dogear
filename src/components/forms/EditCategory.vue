<script setup lang="ts">
import { ref } from 'vue'
import type { Category } from '@/env'
import { useForm } from 'vee-validate'
import { categorySchema } from '@/lib/forms/validators/category'
import { buildFormData } from '@/lib/forms/helper'
import { fetchResponse } from '@/lib/connectivity'
import { customEventNames } from '@/lib/eventNames'
import {
  Card,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { Button, PrimaryButton } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Save, CircleX } from 'lucide-vue-next'
import { ErrorMessage } from '@/components/forms'

const props = defineProps<{
  category: Category
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
}>()

const { category } = props

const { PUBLIC_BASE_URL, PUBLIC_APP_API_TOKEN } = import.meta.env

const serverErrorMessage = ref('')

const { errors, handleSubmit, defineField } = useForm({
  initialValues: {
    name: category.name,
  },
  validationSchema: categorySchema,
})

const [name, nameAttrs] = defineField('name')

const onSubmit = handleSubmit(async (values) => {
  const url = `${PUBLIC_BASE_URL}/api/category/edit/${category.id}.json`
  const formData = buildFormData(values)
  const response = await fetchResponse(url, 'PUT', PUBLIC_APP_API_TOKEN, formData)
  
  if (response.status !== 200) {
    const errorData = await response.json()
    serverErrorMessage.value = errorData.message
  } else {
    serverErrorMessage.value = ''
    const data = await response.json()
    const event = new CustomEvent(customEventNames.categoryUpdate, { detail: data })
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
            class="mt-2"
          />
        </ErrorMessage>
      </CardContent>
      <CardFooter class="justify-between">
        <PrimaryButton
          class="mt-4 hover:scale-105"
          type="submit"
          size="xs"
        >
          <Save class="mr-2 h-4 w-4" />
          Save Changes
        </PrimaryButton>
        <Button
          size="xs"
          class="bg-ctp-overlay1 hover:bg-ctp-surface2 hover:scale-105"
          @click="$emit('cancel')"
        >
          <CircleX class="mr-2 h-4 w-4" />
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
