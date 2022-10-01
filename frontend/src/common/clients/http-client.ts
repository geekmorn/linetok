import axios, { AxiosInstance } from 'axios'
import { API_URL } from 'common/constants'
import { getToken, removeToken } from 'common/utils'
import { compose } from 'common/utils/fp'

const createAuthHeaders = (token: string | null) =>
  token && {
    Authorization: `Bearer ${token}`
  }

const withRequestInterceptor = (client: AxiosInstance) => {
  client.interceptors.request.use(async (config) => {
    const token = getToken()
    const authHeaders = createAuthHeaders(token)

    if (!authHeaders) return config

    config.headers = { ...config.headers, ...authHeaders }
    return config
  })
  return client
}

const withResponseInterceptor = (client: AxiosInstance) => {
  client.interceptors.response.use(
    async (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        removeToken()
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }
  )
  return client
}

const withInterceptors = compose(
  withRequestInterceptor,
  withResponseInterceptor
)

const createClient = (baseURL: string) => axios.create({ baseURL })

export const httpClient = withInterceptors(createClient(API_URL))
