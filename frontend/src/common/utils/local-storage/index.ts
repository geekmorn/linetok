export type Getter = (key: string) => string | null
export type Setter = (key: string, value: string) => void
export type Remover = (key: string) => void

const getItem = (key: string) =>
  // Get item from local storage.
  localStorage.getItem(key)

const setItem = (key: string, value: string) =>
  // Set item to local storage.
  localStorage.setItem(key, value)

const removeItem = (key: string) =>
  // Remove item from local storage.
  localStorage.removeItem(key)

export const storage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> = {
  getItem,
  setItem,
  removeItem
}

// We use
// Dependency Inversion Principle
// of SOLID principles to separate the interface of the browser localStorage implementation.
//* https://en.wikipedia.org/wiki/Dependency_inversion_principle
