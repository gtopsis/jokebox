import { appConfig } from '@/appConfig'
import { useFetch } from '@/composables/useFetch'
import type { Joke, JokeValidType } from '@/types/joke'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const createJokeCollection = (type: JokeValidType, length: number): Joke[] => {
  return Array.from({ length }, (_, index) => ({
    id: index,
    type,
    setup: `Joke setup ${index}`,
    punchline: `Joke punchline ${index}`,
  }))
}

const createFetchMockWithResolvedValue = (
  response: Response = { ok: true, statusText: 'OK' } as Response
) => {
  return vi.spyOn(window, 'fetch').mockResolvedValueOnce(response as Response)
}

const createFetchMockWithRejectedValue = () => {
  return vi
    .spyOn(window, 'fetch')
    .mockRejectedValueOnce(new Error('Failed to fetch data'))
}

describe('useFetch', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should fetch 10 random jokes when when a request for 10 jokes of type random is made to Jokes API', async () => {
    const { fetchData, data: jokes } = useFetch()
    const apiUrl = `${appConfig.API_BASE_URL}/random/10`
    const mockedFetch = createFetchMockWithResolvedValue({
      ok: true,
      json: async () => createJokeCollection('random', 10),
    } as Response)

    await fetchData(apiUrl)

    expect(mockedFetch).toHaveBeenCalledExactlyOnceWith(apiUrl, {
      method: 'GET',
    })
    expect(jokes.value).toEqual(createJokeCollection('random', 10))
  })

  it('should fetch 10 programming jokes when when a request for 10 jokes of type programming is made to Jokes API', async () => {
    const { fetchData, data: jokes } = useFetch()
    const apiUrl = `${appConfig.API_BASE_URL}/programming/ten`
    const mockedFetch = createFetchMockWithResolvedValue({
      ok: true,
      json: async () => createJokeCollection('programming', 10),
    } as Response)

    await fetchData(apiUrl)

    expect(mockedFetch).toHaveBeenCalledExactlyOnceWith(apiUrl, {
      method: 'GET',
    })
    expect(jokes.value).toEqual(createJokeCollection('programming', 10))
  })

  it('should set error when a request to fetch jokes failed', async () => {
    const { fetchData, error } = useFetch()
    const apiUrl = `${appConfig.API_BASE_URL}/random/10`
    const mockedFetch = createFetchMockWithRejectedValue()

    await fetchData(apiUrl)

    expect(mockedFetch).toHaveBeenCalledExactlyOnceWith(apiUrl, {
      method: 'GET',
    })
    expect(error.value).toBeInstanceOf(Error)
    expect(error.value?.message).toEqual('Failed to fetch data')
  })

  it('should set isFetching equals to true when a request to fetch jokes is ongoing, otherwise false', async () => {
    const { fetchData, isFetching, data } = useFetch()
    const apiUrl = `${appConfig.API_BASE_URL}/random/10`
    let resolveFunction: (value: Response) => void = () => {}
    const mockedFetch = vi
      .spyOn(window, 'fetch')
      .mockImplementationOnce(async () => {
        return new Promise((resolve) => {
          resolveFunction = resolve
        })
      })

    const fetchPromise = fetchData(apiUrl)

    expect(mockedFetch).toHaveBeenCalledExactlyOnceWith(apiUrl, {
      method: 'GET',
    })
    expect(isFetching.value).toBe(true)

    // manually resolve promise
    resolveFunction({
      ok: true,
      json: async () => createJokeCollection('random', 10),
    } as Response)
    await fetchPromise

    expect(isFetching.value).toBe(false)
    expect(data.value).toEqual(createJokeCollection('random', 10))
  })

  it('should set error properly when a request to fetch jokes returns non-ok responses', async () => {
    const apiUrl = `${appConfig.API_BASE_URL}/random/10`
    const mockedFetch = createFetchMockWithResolvedValue({
      ok: false,
      statusText: 'Not Found',
    } as Response)
    const { fetchData, isFetching, error } = useFetch()

    await fetchData(apiUrl)

    expect(mockedFetch).toHaveBeenCalledExactlyOnceWith(apiUrl, {
      method: 'GET',
    })
    expect(isFetching.value).toBe(false)
    expect(error.value).toBeInstanceOf(Error)
    expect(error.value?.message).toContain('Not Found')
  })
})
