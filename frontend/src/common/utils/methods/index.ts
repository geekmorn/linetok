import { httpClient } from 'common/clients'

export const all = async <Interface>(endpoint: string, client = httpClient) =>
  await client
    .get<Interface>(endpoint)
    .then((response) => response.data)
    .catch((e) => {
      console.error(e)
      return []
    })

export const selected =
  <Interface>(endpoint: string, client = httpClient) =>
  async (parameter: unknown) =>
    await client
      .get<Interface>(`${endpoint}/${parameter}`)
      .then((response) => response.data)
      .catch((e) => {
        console.error(e)
        return []
      })

export const post =
  <Interface>(endpoint: string, client = httpClient) =>
  (payload: Interface) =>
    client
      .post(endpoint, payload)
      .then((response) => response.data)
      .catch((e) => {
        console.error(e)
      })

export const put =
  <Interface>(endpoint: string, client = httpClient) =>
  (payload: Interface & { id: string }) =>
    client
      .put<Interface>(`${endpoint}/${payload.id}`, payload)
      .then((response) => response.data)
      .catch((e) => {
        console.error(e)
      })

export const _delete =
  <Interface>(endpoint: string, client = httpClient) =>
  (id: string) =>
    client
      .delete<Interface>(`${endpoint}/${id}`)
      .then((response) => response.data)
      .catch((e) => {
        console.error(e)
      })
