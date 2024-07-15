<script setup lang="ts">
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button';

const props = defineProps({
  bookmark: {
    type: Object,
    default: () => {}
  }
})

const emit = defineEmits(['deleteBookmark'])

const { bookmark } = props
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ bookmark?.name }}</CardTitle>
      <CardDescription>
        <a 
          :href="bookmark?.url" 
          target="_blank"
        >
          {{ bookmark?.url }}
        </a>
      </CardDescription>
    </CardHeader>
    <CardFooter>
      <Button
        @click="emit('deleteBookmark', bookmark?.id)"
      >
        Delete
      </Button>
    </CardFooter>
  </Card>
</template>
