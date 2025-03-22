<script setup lang="ts">
import JokeCollectionItem from '@/components/JokeCollectionItem.vue'
import { useFavoriteJokeCollection } from '@/composables/useFavoriteJokeCollection'
import { useJokeCollection } from '@/composables/useJokeCollection'
import type { JokeExtended } from '@/types/joke'

interface Props {
  jokes: JokeExtended[]
}

const { jokes } = defineProps<Props>()

const { toggleJokeInFavorites } = useFavoriteJokeCollection()
const { setJokeFavoriteStatusInNewJokesCollection } = useJokeCollection()

const revealPunchline = (jokeId: number) => {
  const joke = jokes.find((j) => j.id === jokeId)

  if (joke) {
    joke.visiblePunchline = true
  }
}

const toggleJokeFavoriteStatus = (jokeId: number) => {
  const joke = jokes.find((j) => j.id === jokeId)
  if (!joke) {
    return
  }

  const newSaveStatus = !joke.saved

  toggleJokeInFavorites(
    {
      ...joke,
      saved: newSaveStatus,
    },
    newSaveStatus
  )
  setJokeFavoriteStatusInNewJokesCollection(joke.id, newSaveStatus)
}
</script>

<template>
  <TransitionGroup name="collection">
    <JokeCollectionItem
      v-for="joke in jokes"
      :key="joke.id"
      class="mt-2"
      :joke="joke"
      @onPunchlineRevealed="revealPunchline(joke.id)"
      @onToggleSave="toggleJokeFavoriteStatus(joke.id)"
    />
  </TransitionGroup>
</template>

<style lang="css"></style>
