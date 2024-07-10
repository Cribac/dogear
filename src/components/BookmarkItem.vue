<script setup lang="ts">
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const props = defineProps({
  bookmark: {
    type: Object
  }
})

const { bookmark } = props
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ bookmark?.name }}</CardTitle>
      <CardDescription>
        <a :href="bookmark?.url" target="_blank">{{ bookmark?.url }}</a>
      </CardDescription>
    </CardHeader>
    <CardFooter>
      FOOTER
    </CardFooter>
  </Card>
</template>
