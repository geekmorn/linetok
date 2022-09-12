import { storage } from 'common/utils/local-storage'

const TOKEN_KEY = 'access-token'

export const getToken = (tokenKey = TOKEN_KEY) =>
  // Get token from local storage.
  storage.getItem(tokenKey)

export const setToken = (payload: string, tokenKey = TOKEN_KEY) =>
  // Set token to localStorage.
  storage.setItem(tokenKey, payload)

export const removeToken = (tokenKey = TOKEN_KEY) =>
  // Remove token from localStorage.
  storage.removeItem(tokenKey)
