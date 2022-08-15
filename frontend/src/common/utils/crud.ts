/* eslint-disable indent */
import { httpClient } from 'common/clients'
import { all, selected } from 'common/utils/filters'

export const create =
  <Interface>(endpoint: string) =>
  async (payload: Interface) =>
    await httpClient
      .post<Interface>(endpoint, payload)
      .then((response) => response.data)
      .catch((e) => console.error(e))

export const read =
  <Interface>(endpoint: string) =>
  async (parameter?: unknown) => {
    if (parameter) return await selected<Interface>(endpoint, parameter)
    return await all<Interface>(endpoint)
  }

export const update =
  <Interface>(endpoint: string) =>
  async (id: string, payload: Interface) =>
    await httpClient
      .put<Interface>(`${endpoint}/${id}`, payload)
      .then((response) => response.data)
      .catch((e) => console.error(e))

export const destroy =
  <Interface>(endpoint: string) =>
  async (id: string) =>
    await httpClient
      .delete<Interface>(`${endpoint}/${id}`)
      .then((response) => response.data)
      .catch((e) => console.error(e))
