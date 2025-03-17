<script setup lang="ts">
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
      <span class="mx-2 mt-4 mb-0 block text-xs text-[#333]">
        It seems that non joke stole your heart so far :)
      </span>
    </div>
  </div>
  <JokeCollection v-else :jokes="jokes" />
</template>
