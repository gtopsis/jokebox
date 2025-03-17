import { constants } from '@/constants'
import type { ExtendedJoke, Joke } from '@/types/joke'
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

    const apiUrl = `${constants.API_BASE_URL}/${type}/${formattedNumberOfJokes}`

    await fetchData(apiUrl)

    jokesFetchedLastDate.value = new Date().toISOString()
  }

  const favoriteJokes = ref<ExtendedJoke[]>(
    loadStoredItems<ExtendedJoke[]>(constants.STORE_KEY_FAVORITES) || []
  )

  const loadFavoriteJokes = () => {
    favoriteJokes.value =
      loadStoredItems<ExtendedJoke[]>(constants.STORE_KEY_FAVORITES) || []
  }

  const saveFavoriteJokes = () => {
    storeItem(constants.STORE_KEY_FAVORITES, favoriteJokes.value)
  }

  const addJokeToFavorites = (joke: ExtendedJoke) => {
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
  }
}
