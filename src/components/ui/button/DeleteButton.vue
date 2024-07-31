<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-vue-next'

const props = defineProps<{
  buttonText: string
}>()

defineEmits<{
  (e: 'delete'): void
}>()
</script>

<template>
  <Button
    variant="destructive"
    @click="$emit('delete')"
  >
    <Trash2 class="w-4 h-4 mr-2" />
    {{ props.buttonText }}
  </Button>
</template>
