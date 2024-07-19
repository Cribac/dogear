<script setup lang="ts">
import { ref, } from 'vue'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const props = defineProps<{
  // eslint-disable-next-line no-undef
  categories: Category[]
}>()

const { categories } = props

const categoryId = ref(categories[0].id)
</script>

<template :class="props.class">
  <Select
    v-model="categoryId"
    name="categoryId"
  >
    <SelectTrigger class="w-[180px]">
      <SelectValue placeholder="Select a category" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Categories</SelectLabel>
        <template
          v-for="category in categories"
          :key="category.id"
        >
          <SelectItem 
            :value="category.id"
          >
            {{ category.name }}
          </SelectItem>
        </template>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
