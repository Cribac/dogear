<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { signinSchema } from '@/lib/forms/validators/signin'
import { buildFormData } from '@/lib/forms/helper'
import { 
  Card,
  CardHeader,
  CardTitle,
  CardContent 
} from '@/components/ui/card'
import { PrimaryButton } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ErrorMessage } from '@/components/forms'

const { PUBLIC_APP_API_TOKEN } = import.meta.env

const serverErrorMessage = ref('')

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: signinSchema,
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  const formData = buildFormData(values)

  const response = await fetch('/api/auth/signin', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PUBLIC_APP_API_TOKEN}`,
    },
    body: formData,
  })
  if (response.status !== 200) {
    const data = await response.json()
    serverErrorMessage.value = data.message
  } else {
    serverErrorMessage.value = ''
    window.location.href = '/'
  }
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Sign in</CardTitle>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit">
        <ErrorMessage
          :message="errors.email"
        >
          <Label for="email">Email</Label>
          <Input
            v-bind="emailAttrs" 
            id="email"
            v-model="email"
            type="email"
            name="email"
            class="mt-2"
          />
        </ErrorMessage>
        <ErrorMessage
          :message="errors.password"
          class="mt-4"
        >
          <Label
            for="password"
            class="pt-6"
          >
            Password
          </Label>
          <Input
            v-bind="passwordAttrs"
            id="password"
            v-model="password"
            type="password"
            name="password"
            class="mt-2"
          />
        </ErrorMessage>
        <PrimaryButton
          class="mt-4"
          type="submit"
        >
          Sign in
        </PrimaryButton>
      </form>
      <ErrorMessage
        v-if="serverErrorMessage"
        :message="serverErrorMessage"
        class="mt-4 text-center"
      />
    </CardContent>
  </Card>
</template>
