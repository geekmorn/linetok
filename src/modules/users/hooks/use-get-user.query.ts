import { useId } from 'react'
import { users } from 'modules/users/services'
import { useQuery } from '@tanstack/react-query'

interface Parameters {
  id: string
}

export const useGetUserQuery = ({ id }: Parameters) => {
  const uid = useId()
  return useQuery(['Get user by ID', uid], () => users.get(id))
}
