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
