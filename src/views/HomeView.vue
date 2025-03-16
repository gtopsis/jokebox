<script setup lang="ts">
import TheCardSkeleton from '@/components/TheCardSkeleton.vue'
import { useJokeCollection } from '@/composables/useJokeCollection'
import type { Joke } from '@/types/joke'
import { formatDistanceToNow } from 'date-fns'
import { computed, onMounted, ref } from 'vue'
import ErrorAlert from '../components/ErrorAlert.vue'
import GetJokesToolbar from '../components/GetJokesToolbar.vue'
import JokeCollection from '../components/JokeCollection.vue'

const { getNewJokes, isLoading, fetchError, data, jokesFetchedLastDate } =
  useJokeCollection()

const jokes = computed<Joke[] | null>(() => data.value)

const defaultJokeType = 'random'
const jokeType = ref<'programming' | 'random'>(defaultJokeType)
const numberOfJokes = import.meta.env.VITE_NUMBER_OF_JOKES || 10

const fetchJokes = async () => {
  await getNewJokes(jokeType.value, numberOfJokes)
}

const jokesFetchedTimeAgoText = computed(() =>
  jokesFetchedLastDate.value
    ? `${numberOfJokes} jokes fetched ${formatDistanceToNow(jokesFetchedLastDate.value)} ago`
    : 'No Jokes yet :('
)

const onFilterUpdate = (value: boolean) => {
  jokeType.value = value ? 'programming' : 'random'
}

onMounted(async () => {
  await fetchJokes()
})
</script>

<template>
  <GetJokesToolbar
    class="mt-6"
    @onJobsFetchRequest="fetchJokes"
    @onFilterUpdate="onFilterUpdate"
  />

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
