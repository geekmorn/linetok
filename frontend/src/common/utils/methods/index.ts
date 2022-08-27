/* eslint-disable indent */
import { httpClient } from 'common/clients'

export const all = async <Interface>(endpoint: string) =>
  await httpClient
    .get<Interface[]>(endpoint)
    .then((response) => response.data)
    .catch((e) => console.error(e))

export const selected =
  <Interface>(endpoint: string) =>
  async (parameter: unknown) =>
    await httpClient
      .get<Interface>(`${endpoint}/${parameter}`)
      .then((response) => response.data)
      .catch((e) => console.error(e))

export const post =
  <Interface>(endpoint: string) =>
  (payload: Interface) =>
    httpClient
      .post<Interface>(endpoint, payload)
      .then((response) => response.data)
      .catch((e) => console.error(e))

export const put =
  <Interface>(endpoint: string) =>
  (payload: Interface & { id: number }) =>
    httpClient
      .put<Interface>(`${endpoint}/${payload.id}`, payload)
      .then((response) => response.data)
      .catch((e) => console.error(e))

export const _delete =
  <Interface>(endpoint: string) =>
  (id: number) =>
    httpClient
      .delete<Interface>(`${endpoint}/${id}`)
      .then((response) => response.data)
      .catch((e) => console.error(e))
