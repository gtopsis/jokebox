<script setup lang="ts">
import { appConfig } from '@/appConfig'
import EmptyContent from '@/components/EmptyContent.vue'
import ErrorAlert from '@/components/ErrorAlert.vue'
import GetJokesToolbar from '@/components/GetJokesToolbar.vue'
import JokeCollection from '@/components/JokeCollection.vue'
import TheCardSkeleton from '@/components/TheCardSkeleton.vue'
import { useJokeCollection } from '@/composables/useJokeCollection'
import type { JokeValidType } from '@/types/joke'
import { retrieveStoredItem, storeItem } from '@/utils/localStorage'
import { formatDistanceToNow } from 'date-fns'
import { computed, onMounted, ref } from 'vue'

const {
  isLoading,
  fetchError,
  newJokes,
  jokesFetchedLastDate,
  getNewJokes,
  loadNewJokesFromStorage,
  loadFavoriteJokesFromStorage,
} = useJokeCollection()

const defaultJokeType: JokeValidType = 'random'
const activeJokeType = ref<JokeValidType>(
  retrieveStoredItem(appConfig.STORE_KEY_JOKE_TYPE) ?? defaultJokeType
)

const jokesFetchedTimeAgoText = computed(() => {
  if (jokesFetchedLastDate.value) {
    const timeFromNow = formatDistanceToNow(jokesFetchedLastDate.value)

    return `${appConfig.NUMBER_OF_JOKES} jokes fetched ${timeFromNow} ago`
  }

  return 'No Jokes yet :('
})

const getJokes = async () => {
  await getNewJokes(activeJokeType.value, appConfig.NUMBER_OF_JOKES)
}

const updateActiveJokeType = (newJokeType: JokeValidType) => {
  activeJokeType.value = newJokeType
  storeItem(appConfig.STORE_KEY_JOKE_TYPE, activeJokeType.value)
}

const hasNoJokes = computed(
  () => newJokes.value === null || newJokes.value.length === 0
)

onMounted(async () => {
  loadNewJokesFromStorage()
  if (newJokes.value === null) {
    await getJokes()
  }
  loadFavoriteJokesFromStorage()
})
</script>

<template>
  <GetJokesToolbar
    class="mt-6"
    :currentJokeType="activeJokeType"
    @onJobsFetchRequest="getJokes"
    @onJokeTypeUpdate="updateActiveJokeType"
  />

  <div class="text-center">
    <span class="text-text-secondary text-md mx-2 mt-4 mb-0 block">
      {{ jokesFetchedTimeAgoText }}
    </span>
  </div>

  <div class="mt-6 w-full">
    <TheCardSkeleton v-if="isLoading" />
    <ErrorAlert v-else-if="fetchError" :error="fetchError" />

    <EmptyContent v-if="hasNoJokes" class="mt-6 w-full"
      >It seems that the room is too cold already!
    </EmptyContent>
    <JokeCollection v-else-if="!isLoading" :jokes="newJokes!" />
  </div>
</template>
