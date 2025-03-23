import { appConfig } from '@/appConfig'
import { useJokeStore } from '@/stores/joke'
import type { Joke, JokeExtended, JokeValidType } from '@/types/joke'
import { retrieveStoredItem, storeItem } from '@/utils/localStorage'
import { computed, ref } from 'vue'
import { useFetch } from './useFetch'

export const useNewJokeFetch = () => {
  const jokeStore = useJokeStore()
  const newJokes = computed<JokeExtended[] | null>(() => jokeStore.newJokes)

  const { fetchData, isFetching, error, data } = useFetch<Joke[]>()

  const isLoading = computed(() => isFetching.value)
  const fetchError = computed<Error | undefined>(() =>
    error.value
      ? new Error('Failed to fetch new jokes. Please try again!')
      : undefined
  )

  const getJokeExtendedCollection = (
    jokes: Joke[] | null
  ): JokeExtended[] | null => {
    return jokes
      ? jokes.map((joke) => ({
          ...joke,
          saved: false,
          visiblePunchline: false,
        }))
      : null
  }

  const jokesFetchedLastDate = ref<string | null>(null)
  const getNewJokes = async (
    type: JokeValidType,
    numberOfJokes: number = appConfig.NUMBER_OF_JOKES
  ) => {
    const formattedNumberOfJokes =
      type === 'programming' ? 'ten' : numberOfJokes
    const apiUrl = `${appConfig.API_BASE_URL}/${type}/${formattedNumberOfJokes}`
    await fetchData(apiUrl)

    jokeStore.setNewJokes(getJokeExtendedCollection(data.value) ?? [])

    const dateNow = new Date().toISOString()
    jokesFetchedLastDate.value = dateNow
    storeItem(appConfig.STORE_KEY_JOKES_LAST_FETCH_DATE, dateNow)
  }

  const loadNewJokesFromStorage = () => {
    jokeStore.setNewJokes(
      retrieveStoredItem<JokeExtended[]>(appConfig.STORE_KEY_NEW_JOKES)
    )
  }

  const loadJokeTypeFromStorage = () => {
    jokesFetchedLastDate.value = retrieveStoredItem<string>(
      appConfig.STORE_KEY_JOKES_LAST_FETCH_DATE
    )
  }

  return {
    newJokes,
    isLoading,
    fetchError,
    jokesFetchedLastDate,
    getNewJokes,
    loadJokeTypeFromStorage,
    loadNewJokesFromStorage,
  }
}
