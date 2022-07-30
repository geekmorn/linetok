import { useId } from 'react'
import { users } from 'modules/users/service'
import { useQuery } from '@tanstack/react-query'

export const useGetUsersQuery = () => {
  const uid = useId()
  return useQuery(['Get all users', uid], () => users.getAll())
}
