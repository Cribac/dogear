<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-vue-next'
</script>

<template>
  <form action="/api/auth/signout">
    <Button
      size="xs"
      class="bg-ctp-overlay1 hover:bg-ctp-surface2"
      type="submit"
    >
      <LogOut class="mr-2 h-4 w-4" />
      Sign out
    </Button>
  </form>
</template>
