<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { signinSchema } from '@/lib/forms/validators/signin'
import { buildFormData } from '@/lib/forms/helper'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import ErrorMessage from '@/components/forms/ErrorMessage.vue'

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
        <ErrorMessage :message="errors.email">
          <Label for="email"> Email </Label>
          <Input id="email" type="email" name="email" v-model="email" v-bind="emailAttrs" />
        </ErrorMessage>
        <ErrorMessage :message="errors.password" class="mt-4">
          <Label for="password" class="pt-6"> Password </Label>
          <Input id="password" type="password" name="password" v-model="password" v-bind="passwordAttrs" />
        </ErrorMessage>
        <Button type="submit">Login</Button>
      </form>
      <ErrorMessage v-if="serverErrorMessage" :message="serverErrorMessage" />
    </CardContent>
  </Card>
</template>
