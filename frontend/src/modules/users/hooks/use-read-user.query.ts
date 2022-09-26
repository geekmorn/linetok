import { useQuery } from '@tanstack/react-query'
import { API } from 'common/constants'
import { UserType } from 'common/types'
import { read } from 'common/utils'

type Parameters = Pick<UserType, 'username'>

export const useReadUserQuery = ({ username }: Parameters) =>
  useQuery(
    //
    ['Read user by username'],
    async () => await read<UserType>(API.users, username)
  )
