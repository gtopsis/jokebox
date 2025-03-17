<script setup lang="ts">
import { useJokeCollection } from '@/composables/useJokeCollection'
import type { Joke, JokeExtended } from '@/types/joke'
import { computed } from 'vue'
import JokeCollectionItem from './JokeCollectionItem.vue'

interface Props {
  jokes: Joke[]
}

const { jokes = [] } = defineProps<Props>()

const { addJokeToFavorites, removeJokeFromFavorites } = useJokeCollection()

const extendedJokesCollection = computed<JokeExtended[]>(() =>
  jokes.map((joke) => ({
    ...joke,
    saved: false,
    visiblePunchline: false,
  }))
)

const onJokePunchlineRevealed = (joke: JokeExtended) => {
  joke.visiblePunchline = true
}

const updateJokeSavedStatus = (joke: JokeExtended, isSaved: boolean) => {
  joke.saved = isSaved

  if (isSaved) {
    addJokeToFavorites(joke)
  } else {
    removeJokeFromFavorites(joke.id)
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
      :saved="joke.saved"
      :visiblePunchline="joke.visiblePunchline"
      @onPunchlineRevealed="onJokePunchlineRevealed(joke)"
      @onSave="(isSaved: boolean) => updateJokeSavedStatus(joke, isSaved)"
    />
  </TransitionGroup>
</template>

<style lang="css"></style>
