import { useApi } from 'common/hooks'
import { UserType } from 'common/types'
import { useQuery } from '@tanstack/react-query'

export const useGetUsersQuery = () => {
  const { getAll } = useApi<UserType>('/users')

  return useQuery(
    //
    ['Get all users'],
    () => getAll()
  )
}
