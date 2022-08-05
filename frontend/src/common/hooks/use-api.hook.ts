import { httpClient } from 'common/clients'

export const useApi = <T>(endpoint: string) => {
  /*
   The useApi is a custom hook that allows to easily use fetcher functions.

   Usage:
   const { get, getAll, create, update, remove } = useApi<UserType>("/users")
  */

  const get = async (id: string) => {
    try {
      const response = await httpClient.get<T>(`${endpoint}/${id}`)
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  const getAll = async () => {
    try {
      const response = await httpClient.get<T[]>(endpoint)
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  const create = async (payload: T) => {
    try {
      const response = await httpClient.post<T>(endpoint, payload)
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  const update = async (id: string, payload: T) => {
    try {
      const response = await httpClient.put<T>(`${endpoint}/${id}`, payload)
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  const remove = async (id: string) => {
    try {
      const response = await httpClient.delete<T>(`${endpoint}/${id}`)
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  return {
    get,
    getAll,
    create,
    update,
    remove
  }
}
