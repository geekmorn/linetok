import { localStorage } from '../'

const TOKEN_KEY = 'access-token'

export const getToken = (token = TOKEN_KEY) =>
  /* TODO
   * Docstring
   */
  localStorage.getItem(token)

export const setToken = (payload: string, token = TOKEN_KEY) =>
  /* TODO
   * Docstring
   */
  localStorage.setItem(token, payload)

export const removeToken = (token = TOKEN_KEY) =>
  /* TODO
   * Docstring
   */
  localStorage.removeItem(token)
