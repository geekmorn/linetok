import { UsersService } from 'common/services'
import { useQuery } from '@tanstack/react-query'

export const useGetUsersQuery = () => {
  return useQuery(['Get all users'], () => UsersService.getAll())
}
