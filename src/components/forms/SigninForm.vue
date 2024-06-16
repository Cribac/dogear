<script setup lang="ts">
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
      <label for="email">Email</label>
      <input type="email" name="email" id="email" />
      <label for="password">Password</label>
      <input type="password" name="password" id="password" />
      <button type="submit">Login</button>
      <div v-if="errorMessage">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>
