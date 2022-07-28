import { httpClient } from 'common/client'
import { UsersService } from 'common/services'
import { User } from 'common/types/User'
import { useQuery } from '@tanstack/react-query'

type ResponseType = {
  users: User[]
}

export const useGetUsersQuery = () => {
  return useQuery<ResponseType, Error>(
    ['Get all users'],
    () => UsersService.getAll() as unknown as ResponseType
  )
}
