<script setup lang="ts">
import { splitEmailAddress, getColorByEmail } from '@/lib/utils'

defineProps<{
  profileEmail?: string | null
}>()
</script>

<template>
  <div 
    v-if="profileEmail"
    class="avatar rounded-full text-primary-foreground text-sm p-1"
    :class="getColorByEmail(profileEmail) ? `bg-ctp-${getColorByEmail(profileEmail)}`: 'bg-ctp-yellow'" 
  >
    {{ splitEmailAddress(profileEmail).toUpperCase() }}
  </div>
</template>
