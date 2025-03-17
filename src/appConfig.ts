const { VITE_API_BASE_URL, VITE_NUMBER_OF_JOKES, VITE_STORE_KEY_FAVORITES } =
  import.meta.env

export const appConfig = {
  API_BASE_URL:
    VITE_API_BASE_URL || 'https://official-joke-api.appspot.com/jokes',
  NUMBER_OF_JOKES: VITE_NUMBER_OF_JOKES || 10,
  STORE_KEY_FAVORITES: VITE_STORE_KEY_FAVORITES || 'favorites',
} as const
