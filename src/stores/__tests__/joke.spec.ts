import type { JokeExtended, JokeValidType } from '@/types/joke'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useJokeStore } from '../joke'

const createJokeCollection = (
  type: JokeValidType,
  length: number
): JokeExtended[] =>
  Array.from({ length }, (_, index) => ({
    id: index,
    type,
    setup: `Joke setup ${index}`,
    punchline: `Joke punchline ${index}`,
    saved: false,
  }))

describe('joke', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
  })

  it('should mark a joke of new jokes as favorite and add it to favorites\s list', () => {
    const jokeStore = useJokeStore()
    jokeStore.newJokes = createJokeCollection('programming', 5)
    const jokeIdToBeAddedToFavorites = 2

    jokeStore.markJokeAsFavorite(2)

    expect(jokeStore.newJokes).toHaveLength(5)
    expect(
      jokeStore.newJokes.find((j) => j.id === jokeIdToBeAddedToFavorites)
    ).toEqual(
      expect.objectContaining({
        id: jokeIdToBeAddedToFavorites,
        saved: true,
      })
    )
    expect(jokeStore.favoriteJokes).toHaveLength(1)
    expect(
      jokeStore.favoriteJokes.find((j) => j.id === jokeIdToBeAddedToFavorites)
    ).toEqual(
      expect.objectContaining({
        id: jokeIdToBeAddedToFavorites,
        saved: true,
      })
    )
  })

  it('should unmark a joke of new jokes as favorite and remove it from favorites\s list', () => {
    const jokeStore = useJokeStore()
    jokeStore.newJokes = createJokeCollection('programming', 3)
    const jokeIdToBeRemovedFromFavorites = 1

    jokeStore.unmarkJokeFromFavorites(jokeIdToBeRemovedFromFavorites)

    expect(jokeStore.newJokes).toHaveLength(3)
    expect(
      jokeStore.newJokes.find((j) => j.id === jokeIdToBeRemovedFromFavorites)
    ).toEqual(
      expect.objectContaining({
        id: jokeIdToBeRemovedFromFavorites,
        saved: false,
      })
    )
    expect(jokeStore.favoriteJokes).toHaveLength(0)
  })

  it("should remove a joke from favorites' list and retain list of new jokes when this joke does not exist in new jokes list", () => {
    const jokeStore = useJokeStore()
    jokeStore.newJokes = createJokeCollection('programming', 3)
    jokeStore.favoriteJokes = [
      {
        id: 6,
        setup: 'joke setup',
        punchline: 'joke punchline',
        type: 'random',
        saved: true,
      },
    ]
    const jokeIdToBeRemovedFromFavorites = 6

    jokeStore.unmarkJokeFromFavorites(jokeIdToBeRemovedFromFavorites)

    expect(jokeStore.newJokes).toHaveLength(3)
    expect(
      jokeStore.newJokes.find((j) => j.id === jokeIdToBeRemovedFromFavorites)
    ).toBe(undefined)
    expect(jokeStore.favoriteJokes).toHaveLength(0)
  })

  it("should not change favorites' list when a joke does not exist in favorites' list", () => {
    const jokeStore = useJokeStore()
    jokeStore.newJokes = createJokeCollection('programming', 3)
    jokeStore.favoriteJokes = [
      {
        id: 6,
        setup: 'joke setup',
        punchline: 'joke punchline',
        type: 'random',
        saved: true,
      },
    ]
    const jokeIdToBeRemovedFromFavorites = 12

    jokeStore.unmarkJokeFromFavorites(jokeIdToBeRemovedFromFavorites)

    expect(jokeStore.newJokes).toHaveLength(3)
    expect(
      jokeStore.newJokes.find((j) => j.id === jokeIdToBeRemovedFromFavorites)
    ).toBe(undefined)
    expect(jokeStore.favoriteJokes).toHaveLength(1)
    expect(
      jokeStore.favoriteJokes.find(
        (j) => j.id === jokeIdToBeRemovedFromFavorites
      )
    ).toBe(undefined)
  })
})
