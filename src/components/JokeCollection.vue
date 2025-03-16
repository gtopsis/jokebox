<script setup lang="ts">
import type { ExtendedJoke, Joke } from '@/types/joke'
import { computed } from 'vue'
import JokeItem from './JokeItem.vue'

interface Props {
  jokes: Joke[]
}

const { jokes = [] } = defineProps<Props>()

const extendedJokesCollection = computed<ExtendedJoke[]>(() =>
  jokes.map((joke) => ({
    ...joke,
    saved: false,
    visiblePunchline: false,
  }))
)

const onJokePunchlineRevealed = (joke: ExtendedJoke) => {
  joke.visiblePunchline = true
}

const updateJokeSavedStatus = (joke: ExtendedJoke, isSaved: boolean) => {
  joke.saved = isSaved
}
</script>

<template>
  <TransitionGroup name="joke-collection">
    <JokeItem
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
