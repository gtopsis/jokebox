<script setup lang="ts">
import JokeCollectionItem from '@/components/JokeCollectionItem.vue'
import { useJokeCollection } from '@/composables/useJokeCollection'
import type { JokeExtended } from '@/types/joke'

interface Props {
  jokes: JokeExtended[]
}

const { jokes } = defineProps<Props>()

const { addJokeToFavorites, removeJokeFromFavorites } = useJokeCollection()

const revealPunchline = (jokeId: number) => {
  const joke = jokes.find((j) => j.id === jokeId)

  if (joke) {
    joke.visiblePunchline = true
  }
}

const toggleJokeFavoriteStatus = (
  jokeId: JokeExtended['id'],
  oldSaveStatus: JokeExtended['saved']
) => {
  if (oldSaveStatus === true) {
    removeJokeFromFavorites(jokeId)
  } else {
    addJokeToFavorites(jokeId)
  }
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
      @onToggleSave="toggleJokeFavoriteStatus(joke.id, joke.saved)"
    />
  </TransitionGroup>
</template>

<style lang="css"></style>
