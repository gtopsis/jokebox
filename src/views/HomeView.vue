<script setup lang="ts">
import { appConfig } from '@/appConfig'
import EmptyContent from '@/components/EmptyContent.vue'
import TheCardSkeleton from '@/components/TheCardSkeleton.vue'
import { useJokeCollection } from '@/composables/useJokeCollection'
import { formatDistanceToNow } from 'date-fns'
import { computed, onMounted, ref } from 'vue'
import ErrorAlert from '../components/ErrorAlert.vue'
import GetJokesToolbar from '../components/GetJokesToolbar.vue'
import JokeCollection from '../components/JokeCollection.vue'

const { getNewJokes, isLoading, fetchError, newJokes, jokesFetchedLastDate } =
  useJokeCollection()

const defaultJokeType = 'random'
const jokeType = ref<'programming' | 'random'>(defaultJokeType)

const fetchJokes = async () => {
  await getNewJokes(jokeType.value, appConfig.NUMBER_OF_JOKES)
}

const jokesFetchedTimeAgoText = computed(() =>
  jokesFetchedLastDate.value
    ? `${appConfig.NUMBER_OF_JOKES} jokes fetched ${formatDistanceToNow(jokesFetchedLastDate.value)} ago`
    : 'No Jokes yet :('
)

const onFilterUpdate = (value: boolean) => {
  jokeType.value = value ? 'programming' : 'random'
}

onMounted(async () => {
  if (newJokes.value === null || newJokes.value === undefined) {
    await fetchJokes()
  }
})
</script>

<template>
  <GetJokesToolbar
    class="mt-6"
    @onJobsFetchRequest="fetchJokes"
    @onFilterUpdate="onFilterUpdate"
  />

  <div class="text-center">
    <span class="text-text-secondary text-md mx-2 mt-4 mb-0 block">
      {{ jokesFetchedTimeAgoText }}
    </span>
  </div>

  <div class="mt-6 w-full">
    <TheCardSkeleton v-if="isLoading" />
    <ErrorAlert v-else-if="fetchError" :error="fetchError" />
    <EmptyContent
      v-if="newJokes === null || newJokes.length === 0"
      class="mt-6 w-full"
      >It seems that the room is too cold already!
    </EmptyContent>

    <JokeCollection
      v-else-if="!isLoading && newJokes !== null"
      :jokes="newJokes"
    />
  </div>
</template>
