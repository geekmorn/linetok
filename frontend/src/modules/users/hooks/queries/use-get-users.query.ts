import { useApi } from 'common/hooks'
import { UserType } from 'common/types'
import { useQuery } from '@tanstack/react-query'

type ParametersType = {
  initialData?: UserType[]
}

export const useGetUsersQuery = ({ initialData }: ParametersType) => {
  const { getAll } = useApi<UserType>('/users')

  return useQuery(
    //
    ['Get all users'],
    () => getAll(),
    {
      initialData
    }
  )
}
