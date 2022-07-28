import { UsersService } from 'common/services'
import { useQuery } from '@tanstack/react-query'

export const useGetUserQuery = (id: number) => {
  return useQuery(['Get user by ID'], () => UsersService.get(id))
}
