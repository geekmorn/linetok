import { httpClient } from 'common/client'
import { IUser } from 'common/types'

export class UsersService {
  public static async getAll() {
    try {
      const response = await httpClient.get<IUser[]>('/users')
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  public static async get(id: number) {
    try {
      const response = await httpClient.get<IUser>(`/users/${id}`)
      return response.data
    } catch (e) {
      console.error(e)
    }
  }
}
