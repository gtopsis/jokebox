import { appConfig } from '@/appConfig'
import { useFetch } from '@/composables/useFetch'
import { useNewJokeFetching } from '@/composables/useNewJokeFetching'
import { useJokeStore } from '@/stores/joke'
import type { Joke, JokeValidType } from '@/types/joke'
import { createTestingPinia } from '@pinia/testing'
import { setActivePinia, type StateTree } from 'pinia'
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

const createJokeCollection = (type: JokeValidType, length: number): Joke[] => {
  return Array.from({ length }, (_, index) => ({
    id: index,
    type,
    setup: `Joke setup ${index}`,
    punchline: `Joke punchline ${index}`,
  }))
}

describe('useNewJokeFetching', () => {
  let mockFetchData: ReturnType<typeof vi.fn>

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
    mockFetchData = vi.fn()

    const initialState: StateTree = {
      joke: {
        newJokes: [],
        favoriteJokes: [],
      },
    }
    const testingPinia = createTestingPinia({
      initialState,
      createSpy: vi.fn,
      stubActions: true,
    })
    setActivePinia(testingPinia)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
  })

  it('should fetch 1 new random joke and store the timestamp to local storage', async () => {
    const mockedUseFetch = vi.mocked(useFetch) as Mock
    mockedUseFetch.mockReturnValue({
      fetchData: mockFetchData,
      data: ref(createJokeCollection('random', 1)),
      isFetching: false,
      error: null,
    })
    const spySetNewJokes = vi.spyOn(useJokeStore(), 'setNewJokes')
    const spyLocalStorage = vi.spyOn(lc, 'storeItem')

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

    expect(jokesFetchedLastDate.value).toBe('2025-03-26T10:00:00.000Z')
    expect(spyLocalStorage).toHaveBeenCalledWith(
      appConfig.STORE_KEY_JOKES_LAST_FETCH_DATE,
      '2025-03-26T10:00:00.000Z'
    )
  })
})
