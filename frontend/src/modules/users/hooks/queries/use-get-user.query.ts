import { useApi } from 'common/hooks'
import { UserType } from 'common/types'
import { useQuery } from '@tanstack/react-query'

type Parameters = {
  id: string
}

export const useGetUserQuery = ({ id }: Parameters) => {
  const { get } = useApi<UserType>('/users')

  return useQuery(
    //
    ['Get user by ID'],
    () => get(id)
  )
}
