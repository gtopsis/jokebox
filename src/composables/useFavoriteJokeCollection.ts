import { appConfig } from '@/appConfig'
import type { JokeExtended } from '@/types/joke'
import { itemExist, retrieveStoredItem, storeItem } from '@/utils/localStorage'
import { ref, watch } from 'vue'

export const useFavoriteJokeCollection = () => {
  const favoriteJokes = ref<JokeExtended[]>([])

  const loadFavoriteJokes = () => {
    favoriteJokes.value =
      retrieveStoredItem<JokeExtended[]>(appConfig.STORE_KEY_FAVORITES) || []
  }

  const saveFavoriteJokes = () => {
    storeItem(appConfig.STORE_KEY_FAVORITES, favoriteJokes.value)
  }

  const addJokeToFavorites = (joke: JokeExtended) => {
    favoriteJokes.value.push(joke)
  }

  const removeJokeFromFavorites = (jokeId: number) => {
    favoriteJokes.value = favoriteJokes.value.filter((j) => j.id !== jokeId)
  }

  const toggleSaveToFavorites = (joke: JokeExtended) => {
    if (joke.saved) {
      addJokeToFavorites(joke)
    } else {
      removeJokeFromFavorites(joke.id)
    }
  }

  if (itemExist(appConfig.STORE_KEY_FAVORITES)) {
    loadFavoriteJokes()
  } else {
    saveFavoriteJokes()
  }

  watch(
    favoriteJokes,
    () => {
      saveFavoriteJokes()
    },
    { deep: true }
  )

  return {
    favoriteJokes,
    loadFavoriteJokes,
    saveFavoriteJokes,
    addJokeToFavorites,
    removeJokeFromFavorites,
    toggleSaveToFavorites,
  }
}
