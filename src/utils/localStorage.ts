export const loadStoredItems = <T>(storeKey: string): T | null => {
  const storedItems = localStorage.getItem(storeKey)

  return storedItems ? JSON.parse(storedItems) : null
}

export const storeItem = <T>(storeKey: string, item: T) => {
  localStorage.setItem(storeKey, JSON.stringify(item))
}
