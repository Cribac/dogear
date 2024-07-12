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

defineProps<{
  bookmark: Bookmark
}>()

defineEmits<{
  (e: 'cancel'): void
}>()

const serverErrorMessage = ref('')

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: bookmarkSchema,
})

const [url, urlAttrs] = defineField('url')
const [name, nameAttrs] = defineField('name')

const onSubmit = handleSubmit(async (values) => {
  console.log('EditBookmark', values)
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
            v-model="name"
            v-bind="nameAttrs"
            id="name"
            name="name"
            type="text"
          />
        </ErrorMessage>
        <ErrorMessage
          :message="errors.url"
          class="mt-4"
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
      </CardContent>
      <CardFooter>
        <Button type="submit">Save Changes</Button>
        <Button @click="$emit('cancel')">Cancel</Button>
        <ErrorMessage 
          v-if="serverErrorMessage"
          :message="serverErrorMessage"
        />
      </CardFooter>
    </Card>
  </form>
</template>
