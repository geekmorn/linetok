import { API } from 'common/constants'
import { UserType } from 'common/types'
import { read } from 'common/utils'
import { UsersProps } from 'pages/admin/users'
import { useQuery } from '@tanstack/react-query'

type ParametersType = Pick<UsersProps, 'initialData'>

export const useReadUsersQuery = (parameters: ParametersType) =>
  useQuery(['Read all users'], async () => await read<UserType[]>(API.users), {
    initialData: parameters.initialData
  })
