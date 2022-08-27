import { localStorage } from '../'

const TOKEN_KEY = 'access-token'

export const getToken = (token = TOKEN_KEY) =>
  // Get token from local storage.
  localStorage.getItem(token)

export const setToken = (payload: string, token = TOKEN_KEY) =>
  // Set token to localStorage.
  localStorage.setItem(token, payload)

export const removeToken = (token = TOKEN_KEY) =>
  // Remove token from localStorage.
  localStorage.removeItem(token)
