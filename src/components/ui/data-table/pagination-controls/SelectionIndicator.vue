<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  selectedRows: number
  totalRows: number
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn(props.class)">
    {{ selectedRows }} of
    {{ totalRows }} row(s) selected.
  </div>
</template>
