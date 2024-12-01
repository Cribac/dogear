<script setup lang="ts">
import { splitEmailAddress, getColorByEmail } from '@/lib/utils'

defineProps<{
  profileEmail?: string | null
}>()
</script>

<template>
  <div 
    v-if="profileEmail"
    class="flex items-center justify-center rounded-full text-primary-foreground text-sm w-8 h-8"
    :class="getColorByEmail(profileEmail) ? `bg-ctp-${getColorByEmail(profileEmail)}`: 'bg-ctp-yellow'" 
  >
    {{ splitEmailAddress(profileEmail).toUpperCase() }}
  </div>
</template>
