<script setup lang="ts">
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-vue-next'
import { Trash2, Pencil } from 'lucide-vue-next'

defineProps<{
  bookmark: {
    id: string
  }
}>()

defineEmits<{
  (e: 'expand'): void
}>()

function emitDelete (id: string) {
  const event = new CustomEvent('DeleteBookmark', { detail: id })
  window.dispatchEvent(event)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="w-8 h-8 p-0"
      >
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="$emit('expand')">
        <Pencil class="w-4 h-4 mr-2" />
        Edit
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        class="text-red-600 cursor-pointer"
        @click="emitDelete(bookmark.id)"
      >
        <Trash2 class="w-4 h-4 mr-2" />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
