<script setup lang="ts">
interface Props {
  message?: string
}

const props = defineProps<Props>()
</script>

<template>
  <div>
    <slot />
    <div 
      v-if="props.message" 
      class="text-ctp-red mt-1"
    >
      {{ props.message }}
    </div>
  </div>
</template>
