<script setup lang="ts">
import { SignoutForm } from '@/components/forms'
import { ref } from 'vue'

const showMenu = ref(false)
const toggleNav = () => {
  showMenu.value = !showMenu.value
}
</script>

<template>
  <div class="bg-indigo-600">
    <nav class="container px-6 py-8 mx-auto md:flex md:justify-between md:items-center">
      <div class="flex items-center justify-between">
        <div class="text-xl font-bold text-gray-100 md:text-2xl hover:text-indigo-400">
          <a href="/">
            DOGEAR
          </a>
        </div>
        <!-- Mobile menu button -->
        <div 
          class="flex md:hidden" 
          @click="toggleNav"
        >
          <button 
            type="button"
            class="text-gray-100 hover:text-gray-400 focus:outline-none focus:text-gray-400"
          >
            <svg
              viewBox="0 0 24 24"
              class="w-6 h-6 fill-current"
            >
              <path
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            </svg>
          </button>
        </div>
      </div>
      <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
      <ul 
        :class="showMenu ? 'flex' : 'hidden'"
        class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
      >
        <li class="text-gray-100 hover:text-indigo-400">
          <a href="/categories">Categories</a>
        </li>
        <li class="text-gray-100 hover:text-indigo-400">
          Item 2
        </li>
        <li class="text-gray-100 hover:text-indigo-400">
          Item 3
        </li>
        <li class="text-gray-100 hover:text-indigo-400">
          <SignoutForm />
        </li>
      </ul>
    </nav>
  </div>
</template>
