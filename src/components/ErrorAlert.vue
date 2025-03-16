<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  error: Error | null
}
const { error } = defineProps<Props>()

const message = computed(
  () => error || 'Something wrong happened. Please try again!'
)
</script>

<template>
  <div
    v-if="error"
    class="border-l-4 border-orange-500 bg-orange-100 p-4 text-orange-700"
    role="alert"
  >
    <h3 class="text-lg font-bold">An error occurred</h3>
    <p>{{ message }}</p>
  </div>
</template>

<style lang="css" scoped></style>
