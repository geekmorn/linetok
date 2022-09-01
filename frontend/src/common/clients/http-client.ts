import axios, { AxiosInstance } from 'axios'
import { API_URL } from 'common/constants'
import { getToken } from 'common/utils'
import { compose } from 'common/utils/fp'

const getAuthorizationHeaders = () => ({
  Authorization: `Bearer ${getToken()}`
})

const withRequestInterceptor = (client: AxiosInstance) => {
  client.interceptors.request.use((config) => {
    config.headers = {
      ...config.headers,
      ...getAuthorizationHeaders()
    }
    return config
  })
  return client
}

const withResponseInterceptor = (client: AxiosInstance) => {
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
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

// Useful:
//* https://jwt.io/introduction
//* https://refactoring.guru/design-patterns/singleton
