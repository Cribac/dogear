<template>
    <div>
    <p>This is a Vue component</p>
    <p class="text">Message from a variable: {{ message }}</p>
    <p class="text">Message from a method: {{ getMessage() }}</p>

    <button 
    @click="increment"
    >
      Count is: {{ count }}
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const message = 'Hello World'

  const getMessage = () => message

  const count = ref(0)

  const increment = () => count.value++
</script>

<style scoped>
  p.text {
    color: red;
  }
</style>
