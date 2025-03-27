import { appConfig } from '@/appConfig'
import { useFetch } from '@/composables/useFetch'
import { useNewJokeFetching } from '@/composables/useNewJokeFetching'
import { useJokeStore } from '@/stores/joke'
import type { Joke, JokeValidType } from '@/types/joke'
import { createTestingPinia } from '@pinia/testing'
import { setActivePinia } from 'pinia'

import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from 'vitest'
import { ref } from 'vue'
import * as lc from '../../utils/localStorage'

vi.mock('../../composables/useFetch')

const createJokeCollection = (type: JokeValidType, length: number): Joke[] =>
  Array.from({ length }, (_, index) => ({
    id: index,
    type,
    setup: `Joke setup ${index}`,
    punchline: `Joke punchline ${index}`,
  }))

describe('useNewJokeFetching', () => {
  let mockFetchData: ReturnType<typeof vi.fn>
  let mockedUseFetch: Mock
  let spySetNewJokes: ReturnType<typeof vi.spyOn>
  let spyLocalStorage: ReturnType<typeof vi.spyOn>

  beforeAll(() => {
    vi.useFakeTimers()
    const mockDate = new Date(2025, 2, 26, 12, 0, 0)
    vi.setSystemTime(mockDate)
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  beforeEach(() => {
    localStorage.clear()

    const initialState = {
      newJokes: [],
      favoriteJokes: [],
    }

    const testingPinia = createTestingPinia({
      initialState: { joke: initialState },
      createSpy: vi.fn,
      stubActions: true,
    })
    setActivePinia(testingPinia)
    mockFetchData = vi.fn()
    mockedUseFetch = vi.mocked(useFetch) as Mock
    spySetNewJokes = vi.spyOn(useJokeStore(), 'setNewJokes')
    spyLocalStorage = vi.spyOn(lc, 'storeItem')
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
  })

  const setupMockUseFetch = ({
    data = null,
    error = null,
  }: Partial<{
    data: Joke[] | null
    error: Error | null
  }> = {}) => {
    mockedUseFetch.mockReturnValue({
      fetchData: mockFetchData,
      data: ref(data),
      isFetching: ref(false),
      error: ref(error),
    })
  }

  const expectedTimestamp = '2025-03-26T10:00:00.000Z'

  it('should get 1 new random joke and store the timestamp to local storage', async () => {
    setupMockUseFetch({ data: createJokeCollection('random', 1) })

    const { getNewJokes, jokesFetchedLastDate } = useNewJokeFetching()
    await getNewJokes(1)

    expect(mockFetchData).toHaveBeenCalled()
    expect(spySetNewJokes).toHaveBeenCalledTimes(1)
    expect(spySetNewJokes).toHaveBeenCalledWith([
      {
        id: 0,
        type: 'random',
        setup: 'Joke setup 0',
        punchline: 'Joke punchline 0',
        saved: false,
        visiblePunchline: false,
      },
    ])

    expect(jokesFetchedLastDate.value).toBe(expectedTimestamp)
    expect(spyLocalStorage).toHaveBeenCalledWith(
      appConfig.STORE_KEY_JOKES_LAST_FETCH_DATE,
      expectedTimestamp
    )
  })

  it('should not get new jokes and return custom error when request to API returns error', async () => {
    setupMockUseFetch({
      data: null,
      error: new Error('Error: Failed to fetch data. Status: 500'),
    })

    const { getNewJokes, jokesFetchedLastDate, fetchError } =
      useNewJokeFetching()
    await getNewJokes(1)

    expect(mockFetchData).toHaveBeenCalled()
    expect(spySetNewJokes).toHaveBeenCalledTimes(1)
    expect(spySetNewJokes).toHaveBeenCalledWith([])
    expect(fetchError.value).toBeInstanceOf(Error)
    expect(fetchError.value?.message).toBe(
      'Failed to fetch new jokes. Please try again!'
    )

    expect(jokesFetchedLastDate.value).toBe(expectedTimestamp)
    expect(spyLocalStorage).toHaveBeenCalledWith(
      appConfig.STORE_KEY_JOKES_LAST_FETCH_DATE,
      expectedTimestamp
    )
  })

  it("should update the current/active joke type to 'programming'", async () => {
    setupMockUseFetch()

    const { updateActiveJokeType, activeJokeType } = useNewJokeFetching()
    await updateActiveJokeType('programming')

    expect(spyLocalStorage).toHaveBeenCalledWith(
      appConfig.STORE_KEY_JOKE_TYPE,
      'programming'
    )
    expect(activeJokeType.value).toBe('programming')
  })
})
