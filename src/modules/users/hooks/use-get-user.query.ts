import { UsersService } from 'modules/users/services'
import { useQuery } from '@tanstack/react-query'

interface Parameters {
  id: string
}

export const useGetUserQuery = (parameters: Parameters) => {
  const { id } = parameters
  return useQuery(['Get user by ID'], () => UsersService.get(id))
}
