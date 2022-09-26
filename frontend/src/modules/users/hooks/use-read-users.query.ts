import { useQuery } from '@tanstack/react-query'
import { API } from 'common/constants'
import { UserType } from 'common/types'
import { read } from 'common/utils'
import { UsersProps } from 'pages/admin/users'

type ParametersType = Pick<UsersProps, 'initialData'>

export const useReadUsersQuery = ({ initialData }: ParametersType) =>
  useQuery(
    //
    ['Read all users'],
    async () => await read<UserType[]>(API.users),
    {
      initialData
    }
  )
