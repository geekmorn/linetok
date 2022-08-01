import { users } from 'modules/users/service'
import { useQuery } from '@tanstack/react-query'

export const useGetUsersQuery = () =>
  useQuery(
    //
    ['Get all users'],
    () => users.getAll()
  )
