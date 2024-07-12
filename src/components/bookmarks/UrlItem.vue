<script setup lang="ts">
import { ExternalLink } from 'lucide-vue-next'

defineProps<{
  url: string
}>()
</script>

<template>
  <div class="flex items-center text-left">
    <ExternalLink />
    <a
      :href="url"
      class="ml-2 text-sm text-muted-foreground"
      target="_blank"
    >
      {{ url }}
    </a>
  </div>
</template>
