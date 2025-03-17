<script setup lang="ts">
import { appConfig } from '@/appConfig'
import type { Joke } from '@/types/joke'
import { loadStoredItems } from '@/utils/localStorage'
import { onMounted, ref } from 'vue'
import JokeCollection from '../components/JokeCollection.vue'

const jokes = ref<Joke[] | null>([])

onMounted(async () => {
  jokes.value = loadStoredItems<Joke[]>(appConfig.STORE_KEY_FAVORITES) || []
})
</script>

<template>
  <div v-if="jokes === null || jokes.length === 0" class="mt-6 w-full">
    <div class="text-center">
      <span class="text-text-secondary text-md mx-2 mt-4 mb-0 block">
        It seems that no joke have been stollen your heart so far :)
      </span>
    </div>
  </div>
  <JokeCollection v-else :jokes="jokes" />
</template>
