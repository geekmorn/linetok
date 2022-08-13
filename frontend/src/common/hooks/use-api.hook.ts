import { httpClient } from 'common/clients'

export const useApi = <Interface>(endpoint: string) => {
  /*
   The useApi is a custom hook that allows to easily use fetcher functions.

   Usage:
   const { get, getAll, create, update, remove } = useApi<UserType>("/users")

   const users = getAll()
  */

  const get = async (id: string) => {
    try {
      const response = await httpClient.get<Interface>(`${endpoint}/${id}`)
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  const getAll = async () => {
    try {
      const response = await httpClient.get<Interface[]>(endpoint)
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  const create = async (payload: Interface) => {
    try {
      const response = await httpClient.post<Interface>(endpoint, payload)
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  const update = async (id: string, payload: Interface) => {
    try {
      const response = await httpClient.put<Interface>(
        `${endpoint}/${id}`,
        payload
      )
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  const remove = async (id: string) => {
    try {
      const response = await httpClient.delete<Interface>(`${endpoint}/${id}`)
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
