import { API } from 'common/constants'
import { UserType } from 'common/types'
import { read } from 'common/utils'
import { useQuery } from '@tanstack/react-query'

type Parameters = {
  id: number
}

export const useReadUserQuery = ({ id }: Parameters) =>
  useQuery(['Read user by ID'], async () => await read<UserType>(API.users, id))
