const {
  VITE_API_BASE_URL,
  VITE_NUMBER_OF_JOKES,
  VITE_STORE_KEY_FAVORITES,
  VITE_STORE_KEY_NEW_JOKES,
} = import.meta.env

export const appConfig = {
  API_BASE_URL:
    VITE_API_BASE_URL || 'https://official-joke-api.appspot.com/jokes',
  NUMBER_OF_JOKES: VITE_NUMBER_OF_JOKES || 10,
  STORE_KEY_FAVORITES: VITE_STORE_KEY_FAVORITES || 'favorite_jokes',
  STORE_KEY_NEW_JOKES: VITE_STORE_KEY_NEW_JOKES || 'new_jokes',
} as const
