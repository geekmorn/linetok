import axios from 'axios'
import { API_URL } from 'common/constants'

export const httpClient = axios.create({
  baseURL: API_URL
})
