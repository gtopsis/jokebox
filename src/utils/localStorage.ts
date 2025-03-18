export const loadStoredItem = <T>(storeKey: string): T | null => {
  const storedItem = localStorage.getItem(storeKey)

  return storedItem ? JSON.parse(storedItem) : null
}

export const storeItem = <T>(storeKey: string, item: T) => {
  localStorage.setItem(storeKey, JSON.stringify(item))
}
