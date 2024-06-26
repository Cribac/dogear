<template>
  <form action="/api/auth/signout">
    <Button type="submit">Sign out</Button>
  </form>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
</script>
