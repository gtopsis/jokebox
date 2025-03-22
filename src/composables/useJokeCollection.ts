import { appConfig } from '@/appConfig'
import { useFetch } from '@/composables/useFetch'
import type { Joke, JokeExtended } from '@/types/joke'
import { itemExist, retrieveStoredItem, storeItem } from '@/utils/localStorage'
import { computed, ref, watch } from 'vue'

export const useJokeCollection = () => {
  const { fetchData, isFetching, error, data } = useFetch<Joke[]>()

  const isLoading = computed(() => isFetching.value)
  const fetchError = computed<Error | undefined>(() =>
    error.value
      ? new Error('Failed to fetch new jokes. Please try again!')
      : undefined
  )

  const newJokes = ref<JokeExtended[] | null>(null)
  const jokesFetchedLastDate = ref<string | null>(null)

  const getNewJokes = async (
    type: 'programming' | 'random',
    numberOfJokes: number
  ) => {
    const formattedNumberOfJokes =
      type === 'programming' ? 'ten' : numberOfJokes
    const apiUrl = `${appConfig.API_BASE_URL}/${type}/${formattedNumberOfJokes}`
    await fetchData(apiUrl)

    newJokes.value = !data.value
      ? null
      : data.value?.map((joke) => ({
          ...joke,
          saved: false,
          visiblePunchline: false,
        }))

    jokesFetchedLastDate.value = new Date().toISOString()
    storeItem('jokesFetchedLastDate', jokesFetchedLastDate.value)
  }

  const loadNewJokes = () => {
    newJokes.value = retrieveStoredItem<JokeExtended[]>(
      appConfig.STORE_KEY_NEW_JOKES
    )
    jokesFetchedLastDate.value = retrieveStoredItem<string>(
      'jokesFetchedLastDate'
    )
  }

  const saveNewJokes = () => {
    storeItem(appConfig.STORE_KEY_NEW_JOKES, newJokes.value)
  }

  const setJokeFavoriteStatusInNewJokesCollection = (
    jokeId: number,
    newStatus: boolean
  ) => {
    const found = newJokes.value?.find((j) => j.id === jokeId)
    if (found) {
      found.saved = newStatus
    }
  }

  if (itemExist(appConfig.STORE_KEY_NEW_JOKES)) {
    loadNewJokes()
  } else {
    saveNewJokes()
  }

  watch(
    newJokes,
    () => {
      saveNewJokes()
    },
    { deep: true }
  )

  return {
    getNewJokes,
    isLoading,
    fetchError,
    newJokes,
    jokesFetchedLastDate,
    loadNewJokes,
    saveNewJokes,
    setJokeFavoriteStatusInNewJokesCollection,
  }
}
