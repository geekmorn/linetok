import { API_ENDPOINTS } from 'common/constants'
import { UserType } from 'common/types'
import { read } from 'common/utils'
import { useQuery } from '@tanstack/react-query'

type ParametersType = {
  initialData?: UserType[]
}

export const useReadUsersQuery = ({ initialData }: ParametersType) =>
  useQuery(
    ['Get all users'],
    async () => await read<UserType>(API_ENDPOINTS.users)(),
    { initialData }
  )
