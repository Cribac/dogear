<script setup lang="ts">
import { ref } from 'vue'
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
import { PrimaryButton } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ErrorMessage } from '@/components/forms'
import { Save } from 'lucide-vue-next'

const props = defineProps({
  profileId: {
    type: String,
    default: () => '',
  },
})

const { PUBLIC_APP_API_TOKEN } = import.meta.env

const serverErrorMessage = ref('')

const { errors, handleSubmit, defineField, resetForm } = useForm({
  validationSchema: categorySchema,
})

const [name, nameAttrs] = defineField('name')

const onSubmit = handleSubmit(async (values) => {
  const url = '/api/category/create'
  const formData = buildFormData(values, props.profileId)

  const response = await fetchResponse(url, 'POST', PUBLIC_APP_API_TOKEN, formData)

  if (response.status !== 200) {
    const errorData = await response.json()
    serverErrorMessage.value = errorData.message
  } else {
    await cleanUp()
    const data = await response.json()
    const event = new CustomEvent(customEventNames.categoryCreate, { detail: data })
    window.dispatchEvent(event)
  }
})

async function cleanUp (): Promise<void> {
  serverErrorMessage.value = ''
  resetForm()
}
</script>
<template>
  <form @submit="onSubmit">
    <Card>
      <CardContent>
        <ErrorMessage
          :message="errors.name"
          class="mt-4 mb-6"
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
      <CardFooter>
        <PrimaryButton type="submit">
          <Save class="mr-2 h-4 w-4" />
          Create category
        </PrimaryButton>
        <ErrorMessage
          v-if="serverErrorMessage"
          :message="serverErrorMessage"
        />
      </CardFooter>
    </Card>
  </form>
</template>
