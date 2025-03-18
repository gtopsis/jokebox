export const retrieveStoredItem = <T>(storeKey: string): T | null => {
  const storedItem = localStorage.getItem(storeKey)

  return storedItem ? JSON.parse(storedItem) : null
}

export const storeItem = <T>(storeKey: string, item: T) => {
  localStorage.setItem(storeKey, JSON.stringify(item))
}

export const itemExist = (storeKey: string): boolean => {
  return localStorage.getItem(storeKey) !== null
}
