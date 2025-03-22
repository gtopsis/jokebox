import type { JokeExtended } from '@/types/joke'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useJokeStore = defineStore('joke', () => {
  const newJokes = ref<JokeExtended[] | null>([])
  const favoriteJokes = ref<JokeExtended[]>([])

  const setNewJokes = (jokes: JokeExtended[] | null) => {
    newJokes.value = jokes
  }

  const setFavoriteJokes = (jokes: JokeExtended[]) => {
    favoriteJokes.value = jokes
  }

  const markJokeAsFavorite = (jokeId: JokeExtended['id']) => {
    const joke = newJokes.value?.find((joke) => joke.id === jokeId)
    if (joke) {
      joke.saved = true
      favoriteJokes.value.push(joke)
    }
  }

  const unmarkJokeFromFavorites = (jokeId: JokeExtended['id']) => {
    favoriteJokes.value = favoriteJokes.value.filter(
      (joke) => joke.id !== jokeId
    )
    const found = newJokes.value?.find((joke) => joke.id === jokeId)
    if (found) {
      found.saved = false
    }
  }

  return {
    newJokes,
    favoriteJokes,
    setNewJokes,
    setFavoriteJokes,
    markJokeAsFavorite,
    unmarkJokeFromFavorites,
  }
})
