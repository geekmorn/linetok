export type Getter = (key: string) => Promise<string>
export type Setter = (key: string, value: string) => Promise<void>
export type Remover = (key: string) => Promise<void>

type LocalStorageType = {
  getItem: Getter
  setItem: Setter
  removeItem: Remover
}

const getItem = async (key: string) =>
  // Get item from local storage.
  await localStorage.getItem(key)

const setItem = async (key: string, value: string) =>
  // Set item to local storage.
  await localStorage.setItem(key, value)

const removeItem = async (key: string) =>
  // Remove item from local storage.
  await localStorage.removeItem(key)

export const localStorage: LocalStorageType = {
  getItem,
  setItem,
  removeItem
}

// We use
// Dependency Inversion Principle
// of SOLID principles to separate the interface of the browser localStorage implementation.
//* https://en.wikipedia.org/wiki/Dependency_inversion_principle
