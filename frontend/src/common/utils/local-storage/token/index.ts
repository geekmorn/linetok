import { storage } from 'common/utils/local-storage'

const TOKEN_KEY = 'access-token'

export const getToken = (token = TOKEN_KEY) =>
  // Get token from local storage.
  storage.getItem(token)

export const setToken = (payload: string, token = TOKEN_KEY) =>
  // Set token to localStorage.
  storage.setItem(token, payload)

export const removeToken = (token = TOKEN_KEY) =>
  // Remove token from localStorage.
  storage.removeItem(token)
