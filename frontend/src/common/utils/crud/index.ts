import { _delete, all, post, put, selected } from 'common/utils/methods'

export const create = async <Interface>(endpoint: string, payload: Interface) =>
  await post<Interface>(endpoint)(payload)

export const read = async <Interface>(endpoint: string, parameter?: unknown) =>
  parameter
    ? await selected<Interface>(endpoint)(parameter)
    : await all<Interface>(endpoint)

export const update = async <Interface extends { id: string }>(
  endpoint: string,
  payload: Interface
) => await put<Interface>(endpoint)(payload)

export const destroy = async <Interface>(endpoint: string, id: string) =>
  await _delete<Interface>(endpoint)(id)

// Useful:
//* https://www.codecademy.com/article/what-is-crud
