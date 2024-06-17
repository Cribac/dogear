<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const errorMessage = ref<string | null>(null)

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: object({
    email: string().required().email(),
    password: string().min(0).required(),
  }),
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  console.log(JSON.stringify(values))

  const formData = new FormData()
  formData.append('email', values.email)
  formData.append('password', values.password)

  const response = await fetch('/api/auth/signin', {
    method: 'POST',
    body: formData,
  })
  if (response.status !== 200) {
    const data = await response.json()
    errorMessage.value = data.message
  } else {
    errorMessage.value = null
    window.location.href = '/'
  }
})

</script>

<template>
  <div>
    <form @submit="onSubmit">
      <Label for="email"> Email </Label>
      <Input id="email" type="email" name="email" v-model="email" v-bind="emailAttrs" />
      <div>{{ errors.email }}</div>
      <Label for="password"> Password </Label>
      <Input id="password" type="password" name="password" v-model="password" v-bind="passwordAttrs" />
      <div>{{ errors.password }}</div>
      <button type="submit">Login</button>
      <div v-if="errorMessage">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>
