import { appConfig } from '@/appConfig'
import type { JokeExtended } from '@/types/joke'
import { retrieveStoredItem, storeItem } from '@/utils/localStorage'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useJokeStore = defineStore('joke', () => {
  const newJokes = ref<JokeExtended[] | null>([])
  const favoriteJokes = ref<JokeExtended[]>([])

  const saveNewJokes = () => {
    storeItem(appConfig.STORE_KEY_NEW_JOKES, newJokes.value)
  }

  const saveFavoriteJokes = () => {
    storeItem(appConfig.STORE_KEY_FAVORITES, favoriteJokes.value)
  }

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
    saveNewJokes()
  }

  const setFavoriteJokes = (jokes: JokeExtended[]) => {
    favoriteJokes.value = jokes
    saveFavoriteJokes()
  }

  const markJokeAsFavorite = (jokeId: JokeExtended['id']) => {
    const joke = newJokes.value?.find((joke) => joke.id === jokeId)
    if (joke) {
      joke.saved = true
      favoriteJokes.value.push({ ...joke })
    }
    saveFavoriteJokes()
    saveNewJokes()
  }

  const unmarkJokeFromFavorites = (jokeId: JokeExtended['id']) => {
    favoriteJokes.value = favoriteJokes.value.filter(
      (joke) => joke.id !== jokeId
    )
    const found = newJokes.value?.find((joke) => joke.id === jokeId)
    if (found) {
      found.saved = false
    }
    saveFavoriteJokes()
    saveNewJokes()
  }

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
