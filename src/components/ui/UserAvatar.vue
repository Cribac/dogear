<script setup lang="ts">
import { splitEmailAddress } from '@/lib/utils'

defineProps<{
  profileEmail?: string | null
}>()
</script>

<template>
  <div 
    v-if="profileEmail"
    class="avatar rounded-full bg-primary/30 text-primary-foreground md:text-xl p-2" 
  >
    {{ splitEmailAddress(profileEmail).toUpperCase() }}
  </div>
</template>
