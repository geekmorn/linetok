const ACCESS_TOKEN_KEY = 'access-token'

export const setAccessToken = (accessToken: string) =>
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY)

export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY)
