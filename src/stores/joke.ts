import { appConfig } from '@/appConfig'
import type { JokeExtended } from '@/types/joke'
import { retrieveStoredItem, storeItem } from '@/utils/localStorage'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useJokeStore = defineStore('joke', () => {
  const newJokes = ref<JokeExtended[] | null>(null)
  const favoriteJokes = ref<JokeExtended[]>([])

  const loadNewJokes = () => {
    newJokes.value = retrieveStoredItem<JokeExtended[]>(
      appConfig.STORE_KEY_NEW_JOKES
    )
  }

  const loadFavoriteJokes = () => {
    favoriteJokes.value =
      retrieveStoredItem<JokeExtended[]>(appConfig.STORE_KEY_FAVORITES) || []
  }

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
      favoriteJokes.value.push({ ...joke })
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

  watch(
    newJokes,
    (jokes: JokeExtended[] | null) => {
      storeItem(appConfig.STORE_KEY_NEW_JOKES, jokes)
    },
    { deep: true }
  )

  watch(
    favoriteJokes,
    (jokes: JokeExtended[]) => {
      storeItem(appConfig.STORE_KEY_FAVORITES, jokes)
    },
    { deep: true }
  )

  return {
    newJokes,
    favoriteJokes,
    setNewJokes,
    setFavoriteJokes,
    markJokeAsFavorite,
    unmarkJokeFromFavorites,
    loadNewJokes,
    loadFavoriteJokes,
  }
})
