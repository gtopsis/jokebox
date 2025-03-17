import { appConfig } from '@/appConfig'
import type { Joke, JokeExtended } from '@/types/joke'
import { loadStoredItems, storeItem } from '@/utils/localStorage'
import { computed, ref } from 'vue'
import { useFetch } from './useFetch'

export const useJokeCollection = () => {
  const { fetchData, isFetching, error, data } = useFetch<Joke[]>()
  const jokesFetchedLastDate = ref<string | null>(null)

  const isLoading = computed(() => isFetching.value)
  const fetchError = computed<Error | undefined>(() =>
    error.value
      ? new Error('Failed to fetch new jokes. Please try again!')
      : undefined
  )

  const getNewJokes = async (
    type: 'programming' | 'random',
    numberOfJokes: number
  ) => {
    const formattedNumberOfJokes =
      type === 'programming' ? 'ten' : numberOfJokes

    const apiUrl = `${appConfig.API_BASE_URL}/${type}/${formattedNumberOfJokes}`

    await fetchData(apiUrl)

    jokesFetchedLastDate.value = new Date().toISOString()
  }

  const favoriteJokes = ref<JokeExtended[]>(
    loadStoredItems<JokeExtended[]>(appConfig.STORE_KEY_FAVORITES) || []
  )

  const loadFavoriteJokes = () => {
    favoriteJokes.value =
      loadStoredItems<JokeExtended[]>(appConfig.STORE_KEY_FAVORITES) || []
  }

  const saveFavoriteJokes = () => {
    storeItem(appConfig.STORE_KEY_FAVORITES, favoriteJokes.value)
  }

  const loadNewJokes = () => {
    data.value = loadStoredItems<JokeExtended[]>(appConfig.STORE_KEY_NEW_JOKES)
  }

  const saveNewJokes = () => {
    storeItem(appConfig.STORE_KEY_NEW_JOKES, data.value)
  }

  const addJokeToFavorites = (joke: JokeExtended) => {
    const found = favoriteJokes.value?.find((j) => j.id === joke.id)
    if (!found) {
      favoriteJokes.value.push(joke)
      saveFavoriteJokes()
    }
  }

  const removeJokeFromFavorites = (jokeId: number) => {
    favoriteJokes.value = favoriteJokes.value.filter((j) => j.id !== jokeId)
    saveFavoriteJokes()
  }

  return {
    getNewJokes,
    isLoading,
    fetchError,
    data,
    jokesFetchedLastDate,
    loadFavoriteJokes,
    addJokeToFavorites,
    removeJokeFromFavorites,
    loadNewJokes,
    saveNewJokes,
  }
}
