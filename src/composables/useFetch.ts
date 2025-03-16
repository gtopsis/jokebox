import { ref, type Ref } from 'vue'

export interface UseFetchResponse<ResultDataType> {
  data: Ref<ResultDataType | null>
  isFetching: Ref<boolean>
  error: Ref<Error | null>
  fetchData: () => Promise<void>
}

export const useFetch = <T = Record<string, unknown>>(
  apiUrl: string,
  options: RequestInit = { method: 'GET' }
): UseFetchResponse<T> => {
  const data: Ref<T | null> = ref(null)
  const isFetching = ref(false)
  const error = ref<Error | null>(null)

  const fetchData = async (): Promise<void> => {
    isFetching.value = true
    error.value = null

    try {
      const response = await fetch(apiUrl, options)

      if (!response.ok) {
        throw new Error(
          `Error: Failed to fetch data. Status: ${response.statusText}`
        )
      }

      const fetchedData = await response.json()
      data.value = fetchedData as T
    } catch (err: unknown) {
      error.value = err as Error
    } finally {
      isFetching.value = false
    }
  }

  return { fetchData, data, isFetching, error }
}
