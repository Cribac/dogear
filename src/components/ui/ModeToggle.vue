<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { Sun, Moon } from 'lucide-vue-next'

const isLightTheme = ref(false)

const ariaLabel = computed(() => {
  return isLightTheme.value ? 'Toggle Dark Mode' : 'Toggle Light Mode'
})

onMounted(() => {
  if (prefersLightScheme() || prefersLightTheme()) {
    isLightTheme.value = true
  }
})

watch(isLightTheme, (value) => {
  if (value) {
    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  } else {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
    localStorage.setItem('theme', 'dark')
  }
})

/**
 * User prefers light theme in browser settings
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
 */
function prefersLightScheme (): boolean {
  return window.matchMedia('(prefers-color-scheme: light)').matches
}

/**
 * User prefers theme from local storage
 */
function prefersLightTheme (): boolean {
  return localStorage.getItem('theme') === 'light'
}

function toggleTheme (): void {
  isLightTheme.value = !isLightTheme.value
}
</script>

<template>
  <button
    class="light-toggle"
    aria-pressed="false"
    :aria-label="ariaLabel"
    transition:persist
    @click="toggleTheme"
  >
    <Moon
      v-if="isLightTheme"
      icon-name="Dark Mode"
      :is-hidden="true"
    />

    <Sun
      v-else
      icon-name="Light Mode"
      :is-hidden="true"
    />
  </button>
</template>
