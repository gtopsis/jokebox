import { useJokeStore } from '@/stores/joke'
import type { JokeExtended } from '@/types/joke'
import { computed } from 'vue'

export const useJokeManagement = () => {
  const jokeStore = useJokeStore()
  const newJokes = computed<JokeExtended[] | null>(() => jokeStore.newJokes)
  const favoriteJokes = computed<JokeExtended[]>(() => jokeStore.favoriteJokes)

  const addJokeToFavorites = (jokeId: number) => {
    jokeStore.markJokeAsFavorite(jokeId)
  }

  const removeJokeFromFavorites = (jokeId: number) => {
    jokeStore.unmarkJokeFromFavorites(jokeId)
  }

  const loadFavoriteJokesFromStorage = () => {
    jokeStore.loadFavoriteJokes()
  }

  return {
    newJokes,
    favoriteJokes,
    loadFavoriteJokesFromStorage,
    addJokeToFavorites,
    removeJokeFromFavorites,
  }
}
