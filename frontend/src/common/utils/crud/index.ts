/* eslint-disable indent */
import { httpClient } from 'common/clients'
import { all, selected } from 'common/utils/filters'

export const create = async <Interface>(endpoint: string, payload: Interface) =>
  await httpClient
    .post<Interface>(endpoint, payload)
    .then((response) => response.data)
    .catch((e) => console.error(e))

export const read = async <Interface>(endpoint: string, parameter?: unknown) =>
  parameter
    ? await selected<Interface>(endpoint)(parameter)
    : await all<Interface>(endpoint)

export const update = async <Interface extends { id: number }>(
  endpoint: string,
  payload: Interface
) =>
  await httpClient
    .put<Interface>(`${endpoint}/${payload.id}`, payload)
    .then((response) => response.data)
    .catch((e) => console.error(e))

export const destroy = async <Interface>(endpoint: string, id: number) =>
  await httpClient
    .delete<Interface>(`${endpoint}/${id}`)
    .then((response) => response.data)
    .catch((e) => console.error(e))

// Useful:
//* https://www.codecademy.com/article/what-is-crud
