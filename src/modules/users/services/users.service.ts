import { httpClient } from 'common/client'
import { IUser } from 'common/interfaces'

export class UsersService {
  public static async getAll() {
    try {
      const response = await httpClient.get<IUser[]>('/users')
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  public static async get(id: string) {
    try {
      if (id) {
        const response = await httpClient.get<IUser>(`/users/${id}`)
        return response.data
      }
    } catch (e) {
      console.error(e)
    }
  }
}
