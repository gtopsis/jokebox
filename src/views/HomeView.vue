<script setup lang="ts">
import TheCardSkeleton from '@/components/TheCardSkeleton.vue'
import { useFetch } from '@/composables/useFetch'
import type { Joke } from '@/types/joke'
import { formatDistanceToNow } from 'date-fns'
import { computed, onMounted, ref } from 'vue'
import ErrorAlert from '../components/ErrorAlert.vue'
import GetJokesToolbar from '../components/GetJokesToolbar.vue'
import JokeCollection from '../components/JokeCollection.vue'

const jokeType = 'random'
const numberOfJokes = import.meta.env.VITE_NUMBER_OF_JOKES || 25
const apiUrl = `${import.meta.env.VITE_API_BASE_URL}${jokeType}/${numberOfJokes}`
const { fetchData, isFetching, error, data } = useFetch<Joke[]>(apiUrl)

const isLoading = computed(() => isFetching.value)
const fetchError = computed<Error | undefined>(() =>
  error.value
    ? new Error('Failed to fetch new jokes. Please try again!')
    : undefined
)
const jokes = computed<Joke[] | null>(() => data.value)

const fetchJokes = async () => {
  await fetchData()

  jokesFetchedLastDate.value = new Date().toISOString()
}

const jokesFetchedLastDate = ref<string | null>(null)
const jokesFetchedTimeAgoText = computed(() => {
  return jokesFetchedLastDate.value
    ? `${numberOfJokes} jokes fetched ${formatDistanceToNow(jokesFetchedLastDate.value)} ago`
    : 'No Jokes yet :('
})

onMounted(async () => {
  await fetchJokes()
})
</script>

<template>
  <GetJokesToolbar @onJobsFetchRequested="fetchJokes" />

  <div class="text-center">
    <span class="mx-2 mt-4 mb-0 block text-xs text-[#333]">
      {{ jokesFetchedTimeAgoText }}
    </span>
  </div>

  <div class="mt-6 w-full">
    <TheCardSkeleton v-if="isLoading" />
    <ErrorAlert v-else-if="fetchError" :error="fetchError" />
    <JokeCollection v-else-if="jokes !== null" :jokes="jokes" />
  </div>
</template>
