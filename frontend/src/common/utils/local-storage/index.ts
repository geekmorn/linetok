const getItem = (key: string) => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(key)
}

const setItem = (key: string, value: string) => {
  if (typeof window === 'undefined') return null
  return localStorage.setItem(key, value)
}

const removeItem = (key: string) => {
  if (typeof window === 'undefined') return null
  return localStorage.removeItem(key)
}

export const storage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> = {
  getItem,
  setItem,
  removeItem
}
