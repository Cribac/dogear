<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ref } from 'vue'

const errorMessage = ref<string | null>(null)

async function onSubmit(e: Event) {
  e.preventDefault()
  const formData = new FormData(e.currentTarget as HTMLFormElement)
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
}
</script>

<template>
  <div>
    <form @submit="onSubmit">
      <Label for="email">
        Email
      </Label>
      <Input id="email" type="email" name="email" placeholder="me@example.com" />
      <Label for="password">
        Password
      </Label>
      <Input id="password" type="password" name="password" />
      <button type="submit">Login</button>
      <div v-if="errorMessage">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>
