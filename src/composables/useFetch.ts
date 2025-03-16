import { ref, type Ref } from 'vue'

interface UseFetchResult<ResultDataType> {
  data: Ref<ResultDataType | null>
  loading: Ref<boolean>
  error: Ref<Error | null>
  fetchData: () => Promise<void>
}

export const useFetch = async <T = Record<string, unknown>>(
  apiUrl: string,
  options: RequestInit = { method: 'GET' }
): Promise<UseFetchResult<T>> => {
  const data = ref<UseFetchResult<T>['data'] | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchData = async (): Promise<void> => {
    try {
      loading.value = true
      error.value = null

      const response = await fetch(apiUrl, options)

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const data = await response.json()
      data.value = data as T
    } catch (err: unknown) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  return { fetchData, data, loading, error }
}
