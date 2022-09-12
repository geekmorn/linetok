/* eslint-disable prettier/prettier */
import { httpClient } from 'common/clients'

export const all = async <Interface>(endpoint: string) =>
  await httpClient
    .get<Interface>(endpoint)
    .then((response) => response.data)
    .catch((e) => {
      console.log(e)
      return []
    })

export const selected =
  <Interface>(endpoint: string) =>
    async (parameter: unknown) =>
      await httpClient
        .get<Interface>(`${endpoint}/${parameter}`)
        .then((response) => response.data)
        .catch((e) => {
          console.log(e)
          return []
        })

export const post =
  <Interface>(endpoint: string) =>
    (payload: Interface) =>
      httpClient
        .post<Interface>(endpoint, payload)
        .then((response) => response.data)
        .catch((e) => e)

export const put =
  <Interface>(endpoint: string) =>
    (payload: Interface & { id: string }) =>
      httpClient
        .put<Interface>(`${endpoint}/${payload.id}`, payload)
        .then((response) => response.data)
        .catch((e) => e)

export const _delete =
  <Interface>(endpoint: string) =>
    (id: string) =>
      httpClient
        .delete<Interface>(`${endpoint}/${id}`)
        .then((response) => response.data)
        .catch((e) => e)
