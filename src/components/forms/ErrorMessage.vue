<script setup lang="ts">
interface Props {
  message?: string
}

const props = defineProps<Props>()
</script>

<template>
  <div>
    <slot />
    <div class="text-red-500 mt-1">{{ props.message }}</div>
  </div>
</template>
