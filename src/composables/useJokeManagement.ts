import { appConfig } from '@/appConfig'
import { useJokeStore } from '@/stores/joke'
import type { JokeExtended } from '@/types/joke'
import { retrieveStoredItem, storeItem } from '@/utils/localStorage'
import { computed, watch } from 'vue'

export const useJokeCollection = () => {
  const jokeStore = useJokeStore()
  const newJokes = computed<JokeExtended[] | null>(() => jokeStore.newJokes)
  const favoriteJokes = computed<JokeExtended[]>(() => jokeStore.favoriteJokes)

  const addJokeToFavorites = (jokeId: number) => {
    jokeStore.markJokeAsFavorite(jokeId)
  }

  const removeJokeFromFavorites = (jokeId: number) => {
    jokeStore.unmarkJokeFromFavorites(jokeId)
  }

  const loadFavoriteJokesFromStorage = () => {
    jokeStore.setFavoriteJokes(
      retrieveStoredItem<JokeExtended[]>(appConfig.STORE_KEY_FAVORITES) || []
    )
  }

  const saveNewJokes = () => {
    storeItem(appConfig.STORE_KEY_NEW_JOKES, newJokes.value)
  }

  const saveFavoriteJokes = () => {
    storeItem(appConfig.STORE_KEY_FAVORITES, favoriteJokes.value)
  }

  watch(
    newJokes,
    () => {
      saveNewJokes()
    },
    { deep: true }
  )

  watch(
    favoriteJokes,
    () => {
      saveFavoriteJokes()
    },
    { deep: true }
  )

  return {
    newJokes,
    favoriteJokes,
    loadFavoriteJokesFromStorage,
    addJokeToFavorites,
    removeJokeFromFavorites,
  }
}
