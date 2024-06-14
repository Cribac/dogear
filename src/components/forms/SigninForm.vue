<script setup lang="ts">
import { toast } from 'vue3-toastify'

async function onSubmit(e: Event) {
  e.preventDefault()
  const formData = new FormData(e.currentTarget as HTMLFormElement)
  const response = await fetch('/api/auth/signin', {
    method: 'POST',
    body: formData,
  })
  if (response.status !== 200) {
    const data = await response.json()
    toast(data.message, {
      type: 'error',
      hideProgressBar: true,
      autoClose: false,
      position: 'top-center',
    })
  } else {
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
    </form>
  </div>
</template>
