<script setup lang="ts">
import EmptyContent from '@/components/EmptyContent.vue'
import FavoriteJokesCollectionStatistics from '@/components/FavoriteJokesCollectionStatistics.vue'
import JokeCollection from '@/components/JokeCollection.vue'
import { useFavoriteJokeCollection } from '@/composables/useFavoriteJokeCollection'
import { onMounted } from 'vue'

const { favoriteJokes, loadFavoriteJokes } = useFavoriteJokeCollection()

onMounted(async () => {
  loadFavoriteJokes()
})
</script>

<template>
  <FavoriteJokesCollectionStatistics class="mt-4 w-full" />

  <div class="mt-6 w-full">
    <EmptyContent
      v-if="favoriteJokes === null || favoriteJokes.length === 0"
      class="mt-6 w-full"
      >It seems that no joke have been stollen your heart so far :)
    </EmptyContent>

    <JokeCollection v-else :jokes="favoriteJokes" />
  </div>
</template>
