<script setup lang="ts">
import EmptyContent from '@/components/EmptyContent.vue'
import FavoriteJokesCollectionStatistics from '@/components/FavoriteJokesCollectionStatistics.vue'
import JokeCollection from '@/components/JokeCollection.vue'
import { useJokeManagement } from '@/composables/useJokeManagement'
import { onMounted } from 'vue'

const { favoriteJokes, loadFavoriteJokesFromStorage, loadNewJokesFromStorage } =
  useJokeManagement()
const hasNoFavoriteJokes =
  favoriteJokes.value === null || favoriteJokes.value.length === 0

onMounted(async () => {
  loadNewJokesFromStorage()
  loadFavoriteJokesFromStorage()
})
</script>

<template>
  <FavoriteJokesCollectionStatistics
    class="mt-4 w-full"
    :numberOfFavorites="favoriteJokes.length"
  />

  <div class="mt-6 w-full">
    <EmptyContent v-if="hasNoFavoriteJokes" class="mt-6 w-full"
      >It seems that no joke have been stollen your heart so far :)
    </EmptyContent>

    <JokeCollection v-else :jokes="favoriteJokes" />
  </div>
</template>
