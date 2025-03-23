import { appConfig } from '@/appConfig'
import { useFetch } from '@/composables/useFetch'
import { useJokeStore } from '@/stores/joke'
import type { Joke, JokeExtended, JokeValidType } from '@/types/joke'
import { retrieveStoredItem, storeItem } from '@/utils/localStorage'
import { computed, ref } from 'vue'

export const useNewJokeFetching = () => {
  const jokeStore = useJokeStore()

  // State
  const defaultJokeType: JokeValidType = 'random'
  const activeJokeType = ref<JokeValidType>(
    retrieveStoredItem(appConfig.STORE_KEY_JOKE_TYPE) ?? defaultJokeType
  )
  const jokesFetchedLastDate = ref<string | null>(null)

  const newJokes = computed<JokeExtended[] | null>(() => jokeStore.newJokes)
  const isLoading = computed(() => isFetching.value)
  const fetchError = computed<Error | undefined>(() =>
    error.value
      ? new Error('Failed to fetch new jokes. Please try again!')
      : undefined
  )

  const { fetchData, isFetching, error, data } = useFetch<Joke[]>()

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

  // Actions
  const getNewJokes = async (
    numberOfJokes: number = appConfig.NUMBER_OF_JOKES
  ) => {
    const formattedNumberOfJokes =
      activeJokeType.value === 'programming' ? 'ten' : numberOfJokes
    const apiUrl = `${appConfig.API_BASE_URL}/${activeJokeType.value}/${formattedNumberOfJokes}`
    await fetchData(apiUrl)

    jokeStore.setNewJokes(getJokeExtendedCollection(data.value) ?? [])

    const dateNow = new Date().toISOString()
    jokesFetchedLastDate.value = dateNow
    storeItem(appConfig.STORE_KEY_JOKES_LAST_FETCH_DATE, dateNow)
  }

  const updateActiveJokeType = (newJokeType: JokeValidType) => {
    activeJokeType.value = newJokeType
    storeItem(appConfig.STORE_KEY_JOKE_TYPE, activeJokeType.value)
  }

  // Storage operations
  const loadJokeTypeFromStorage = () => {
    jokesFetchedLastDate.value = retrieveStoredItem<string>(
      appConfig.STORE_KEY_JOKES_LAST_FETCH_DATE
    )
  }

  return {
    newJokes,
    isLoading,
    fetchError,
    activeJokeType,
    jokesFetchedLastDate,
    updateActiveJokeType,
    getNewJokes,
    loadJokeTypeFromStorage,
  }
}
