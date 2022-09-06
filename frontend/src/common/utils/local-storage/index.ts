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

// We use
// Dependency Inversion Principle
// of SOLID principles to separate the interface of the browser localStorage implementation.
//* https://en.wikipedia.org/wiki/Dependency_inversion_principle
