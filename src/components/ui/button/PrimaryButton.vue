<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { type ButtonVariants } from '.'

const props = defineProps<{
  type?: string
  size?: ButtonVariants['size']
}>()

const { type } = props

</script>

<template>
  <Button
    class="bg-ctp-teal hover:bg-ctp-green"
    :type="type"
    :size="size"
  >
    <slot />
  </Button>
</template>
