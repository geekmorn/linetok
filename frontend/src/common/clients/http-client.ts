import axios from 'axios'
import { API_URL } from 'common/constants'
import { getAccessToken } from 'common/utils'

const getAuthorizationHeaders = () => {
  const token = getAccessToken()
  return { Authorization: `Bearer ${token}` }
}

const createClient = (baseURL: string) => {
  const instance = axios.create({ baseURL })

  instance.interceptors.request.use((config) => {
    const authHeaders = getAuthorizationHeaders()
    config.headers = { ...config.headers, ...authHeaders }
    return config
  })

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }
  )

  return instance
}

export const httpClient = createClient(API_URL)
