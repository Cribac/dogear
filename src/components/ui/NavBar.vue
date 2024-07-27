<script setup lang="ts">
import { ref } from 'vue'
import { SignoutForm } from '@/components/forms'
import UserAvatar from '@/components/ui/UserAvatar.vue'
import ModeToggle from '@/components/ui/ModeToggle.vue'

defineProps<{
  profileEmail?: string | null
}>()

const showMenu = ref(false)

const toggleNav = () => {
  showMenu.value = !showMenu.value
}
</script>

<template>
  <div class="bg-ctp-crust">
    <nav class="container px-6 py-8 mx-auto md:flex md:justify-between md:items-center">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-end">
          <div class="text-xl font-bold text-ctp-text md:text-2xl hover:text-ctp-sky">
            <a
              href="/"
              data-testid="logo"
            >
              DOGEAR
            </a>
          </div>
          <UserAvatar
            v-if="profileEmail"
            :profile-email="profileEmail"
            class="ml-4"
          />
        </div>
        <!-- Mobile menu button -->
        <div 
          class="flex md:hidden"
          @click="toggleNav"
        >
          <button
            type="button"
            class="text-ctp-text hover:text-ctp-sky focus:outline-none focus:text-ctp-sky"
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
        <li>
          <ModeToggle />
        </li>
        <li class="text-ctp-text hover:text-ctp-sky">
          <a href="/categories">Categories</a>
        </li>
        <li>
          <SignoutForm />
        </li>
      </ul>
    </nav>
  </div>
</template>
