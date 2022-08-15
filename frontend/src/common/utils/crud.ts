/* eslint-disable indent */
import { httpClient } from 'common/clients'

export const create =
  <Interface>(endpoint: string) =>
  async (payload: Interface) => {
    try {
      const response = await httpClient.post<Interface>(endpoint, payload)
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

export const read =
  <Interface>(endpoint: string) =>
  async (parameter?: unknown) => {
    if (parameter) {
      try {
        const response = await httpClient.get<Interface>(
          `${endpoint}/${parameter}`
        )
        return response.data
      } catch (e) {
        console.error(e)
      }
    }
    try {
      const response = await httpClient.get<Interface[]>(endpoint)
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

export const update =
  <Interface>(endpoint: string) =>
  async (id: string, payload: Interface) => {
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

export const destroy =
  <Interface>(endpoint: string) =>
  async (id: string) => {
    try {
      const response = await httpClient.delete<Interface>(`${endpoint}/${id}`)
      return response.data
    } catch (e) {
      console.error(e)
    }
  }
