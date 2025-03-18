<script setup lang="ts">
import { useFavoriteJokeCollection } from '@/composables/useFavoriteJokeCollection'

const { favoriteJokes } = useFavoriteJokeCollection()
</script>

<template>
  <div class="flex items-center justify-center text-center">
    <div class="flex">
      <strong class="text-text-primary text-md mx-1 mt-4 mb-0 block">
        Total:
      </strong>
      <span class="text-text-secondary text-md mx-1 mt-4 mb-0 block">
        {{ favoriteJokes.length }} jokes
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
