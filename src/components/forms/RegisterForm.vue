<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { registerSchema } from '@/lib/forms/validators/register'
import { buildFormData } from '@/lib/forms/helper'
import { 
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ErrorMessage } from '@/components/forms'

const serverErrorMessage = ref('')

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: registerSchema,
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  const formData = buildFormData(values)

  const response = await fetch('/api/auth/register', {
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
      <CardTitle>Register Account</CardTitle>
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
          />
        </ErrorMessage>
        <ErrorMessage 
          :message="errors.password" 
          class="mt-4"
        >
          <Label
            for="password"
            class="pt-6"
          >Password</Label>
          <Input 
            v-bind="passwordAttrs"
            id="password" 
            v-model="password"
            type="password"
            name="password"
          />
        </ErrorMessage>
        <Button
          class="mt-4"
          type="submit"
        >
          Register
        </Button>
      </form>
      <ErrorMessage 
        v-if="serverErrorMessage"
        :message="serverErrorMessage"
      />
    </CardContent>
  </Card>
</template>
