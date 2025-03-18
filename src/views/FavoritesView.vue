<script setup lang="ts">
import { useFavoriteJokeCollection } from '@/composables/useFavoriteJokeCollection'
import { onMounted } from 'vue'
import JokeCollection from '../components/JokeCollection.vue'

const { favoriteJokes, loadFavoriteJokes } = useFavoriteJokeCollection()

onMounted(async () => {
  loadFavoriteJokes()
})
</script>

<template>
  <div
    v-if="favoriteJokes === null || favoriteJokes.length === 0"
    class="mt-6 w-full"
  >
    <div class="text-center">
      <span class="text-text-secondary text-md mx-2 mt-4 mb-0 block">
        It seems that no joke have been stollen your heart so far :)
      </span>
    </div>
  </div>
  <JokeCollection v-else :jokes="favoriteJokes" />
</template>
