const isSSR = typeof window === 'undefined'

const getItem = (key: string) => (isSSR ? null : localStorage.getItem(key))

const setItem = (key: string, value: string) =>
  isSSR ? null : localStorage.setItem(key, value)

const removeItem = (key: string) =>
  isSSR ? null : localStorage.removeItem(key)

export const storage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> = {
  getItem,
  removeItem,
  setItem
}
