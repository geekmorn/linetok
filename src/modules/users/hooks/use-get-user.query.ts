import { users } from 'modules/users/service'
import { useQuery } from '@tanstack/react-query'

interface Parameters {
  id: string
}

export const useGetUserQuery = ({ id }: Parameters) =>
  useQuery(
    //
    ['Get user by ID'],
    () => users.get(id)
  )
