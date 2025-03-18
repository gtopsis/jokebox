<script setup lang="ts">
import { useFavoriteJokeCollection } from '@/composables/useFavoriteJokeCollection'
import type { JokeExtended } from '@/types/joke'
import JokeCollectionItem from './JokeCollectionItem.vue'

interface Props {
  jokes: JokeExtended[]
}

const { jokes } = defineProps<Props>()

const { toggleSaveToFavorites } = useFavoriteJokeCollection()

const revealPunchline = (jokeId: number) => {
  const joke = jokes.find((j) => j.id === jokeId)

  if (joke) {
    joke.visiblePunchline = true
  }
}

const toggleSave = (jokeId: number) => {
  const joke = jokes.find((j) => j.id === jokeId)
  if (!joke) {
    return
  }

  const newSaveStatus = !joke.saved
  joke.saved = newSaveStatus
  toggleSaveToFavorites({ ...joke, saved: newSaveStatus })
}
</script>

<template>
  <TransitionGroup name="joke-collection">
    <JokeCollectionItem
      v-for="joke in jokes"
      :key="joke.id"
      class="mt-2"
      :joke="joke"
      @onPunchlineRevealed="revealPunchline(joke.id)"
      @onToggleSave="toggleSave(joke.id)"
    />
  </TransitionGroup>
</template>

<style lang="css"></style>
