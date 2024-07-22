<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  prevButtonDisabled: boolean
  nextButtonDisabled: boolean
  class?: HTMLAttributes['class']
}>()

defineEmits<{
  (e: 'onPrevClick'): void
  (e: 'onNextClick'): void
}>()

</script>

<template>
  <div :class="cn('flex items-center justify-end py-4 space-x-2', props.class)">
    <Button
      id="prev-page"
      variant="outline"
      size="sm"
      :disabled="props.prevButtonDisabled"
      @click="$emit('onPrevClick')"
    >
      Previous
    </Button>
    <Button
      id="next-page"
      variant="outline"
      size="sm"
      :disabled="props.nextButtonDisabled"
      @click="$emit('onNextClick')"
    >
      Next
    </Button>
  </div>
</template>
