import { httpClient } from 'common/client'
import { User } from 'common/types/User'

type ResponseType = {
  users: User[]
}

export class UsersService {
  public static async getAll() {
    try {
      const response = await httpClient.get<ResponseType>('/users')
      return response.data
    } catch (e) {
      console.error(e)
    }
  }
}
