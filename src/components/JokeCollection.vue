<script setup lang="ts">
import { useJokeCollection } from '@/composables/useJokeCollection'
import type { Joke, JokeExtended } from '@/types/joke'
import { reactive } from 'vue'
import JokeCollectionItem from './JokeCollectionItem.vue'

interface Props {
  jokes: Joke[]
}

const { jokes = [] } = defineProps<Props>()

const { addJokeToFavorites, removeJokeFromFavorites } = useJokeCollection()

const extendedJokesCollection = reactive<JokeExtended[]>(
  jokes.map((joke) => ({
    ...joke,
    saved: false,
    visiblePunchline: false,
  }))
)

const revealPunchline = (jokeId: number) => {
  const joke = extendedJokesCollection.find((j) => j.id === jokeId)
  if (joke) {
    joke.visiblePunchline = true
  }
}

const toggleSave = (jokeId: number) => {
  const joke = extendedJokesCollection.find((j) => j.id === jokeId)

  if (!joke) return

  joke.saved = !joke.saved
  if (joke.saved) {
    removeJokeFromFavorites(joke.id)
  } else {
    addJokeToFavorites(joke)
  }
}
</script>

<template>
  <TransitionGroup name="joke-collection">
    <JokeCollectionItem
      v-for="joke in extendedJokesCollection"
      :key="joke.id"
      class="mt-2"
      :joke="joke"
      @onPunchlineRevealed="revealPunchline(joke.id)"
      @onSave="toggleSave(joke.id)"
    />
  </TransitionGroup>
</template>

<style lang="css"></style>
