import { appConfig } from '@/appConfig'
import type { Joke, JokeExtended } from '@/types/joke'
import { loadStoredItem, storeItem } from '@/utils/localStorage'
import { computed, ref, watch } from 'vue'
import { useFetch } from './useFetch'

export const useJokeCollection = () => {
  const { fetchData, isFetching, error, data } = useFetch<Joke[]>()

  const isLoading = computed(() => isFetching.value)
  const fetchError = computed<Error | undefined>(() =>
    error.value
      ? new Error('Failed to fetch new jokes. Please try again!')
      : undefined
  )

  const jokesCollectionWithState = ref<JokeExtended[] | null>(null)

  const jokesFetchedLastDate = ref<string | null>(null)

  const getNewJokes = async (
    type: 'programming' | 'random',
    numberOfJokes: number
  ) => {
    const formattedNumberOfJokes =
      type === 'programming' ? 'ten' : numberOfJokes
    const apiUrl = `${appConfig.API_BASE_URL}/${type}/${formattedNumberOfJokes}`
    await fetchData(apiUrl)

    jokesCollectionWithState.value = !data.value
      ? null
      : data.value?.map((joke) => ({
          ...joke,
          saved: false,
          visiblePunchline: false,
        }))

    jokesFetchedLastDate.value = new Date().toISOString()
    storeItem('jokesFetchedLastDate', jokesFetchedLastDate.value)
  }

  const favoriteJokes = ref<JokeExtended[]>(
    loadStoredItem<JokeExtended[]>(appConfig.STORE_KEY_FAVORITES) || []
  )

  const loadFavoriteJokes = () => {
    favoriteJokes.value =
      loadStoredItem<JokeExtended[]>(appConfig.STORE_KEY_FAVORITES) || []
  }

  const saveFavoriteJokes = () => {
    storeItem(appConfig.STORE_KEY_FAVORITES, favoriteJokes.value)
  }

  const loadNewJokes = () => {
    jokesCollectionWithState.value = loadStoredItem<JokeExtended[]>(
      appConfig.STORE_KEY_NEW_JOKES
    )
    jokesFetchedLastDate.value = loadStoredItem<string>('jokesFetchedLastDate')
  }

  const saveNewJokes = () => {
    storeItem(appConfig.STORE_KEY_NEW_JOKES, jokesCollectionWithState.value)
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

  watch(
    jokesCollectionWithState,
    () => {
      saveNewJokes()
    },
    { deep: true }
  )

  return {
    getNewJokes,
    isLoading,
    fetchError,
    jokesCollectionWithState,
    jokesFetchedLastDate,
    loadFavoriteJokes,
    addJokeToFavorites,
    removeJokeFromFavorites,
    loadNewJokes,
    saveNewJokes,
  }
}
