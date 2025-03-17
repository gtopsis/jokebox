import type { Joke } from '@/types/joke'
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

    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/${type}/${formattedNumberOfJokes}`

    await fetchData(apiUrl)

    jokesFetchedLastDate.value = new Date().toISOString()
  }

  return { getNewJokes, isLoading, fetchError, data, jokesFetchedLastDate }
}
