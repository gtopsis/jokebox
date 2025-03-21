<script setup lang="ts">
import JokeCollectionItem from '@/components/JokeCollectionItem.vue'
import { useFavoriteJokeCollection } from '@/composables/useFavoriteJokeCollection'
import { useJokeCollection } from '@/composables/useJokeCollection'
import type { JokeExtended } from '@/types/joke'

interface Props {
  jokes: JokeExtended[]
}

const { jokes } = defineProps<Props>()

const { toggleSaveToFavorites } = useFavoriteJokeCollection()
const { unsaveJokeFromFavorites } = useJokeCollection()

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
  unsaveJokeFromFavorites(joke.id)
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
      @onToggleSave="toggleSave(joke.id)"
    />
  </TransitionGroup>
</template>

<style lang="css"></style>
