import { API_ENDPOINTS } from 'common/constants'
import { UserType } from 'common/types'
import { read } from 'common/utils'
import { useQuery } from '@tanstack/react-query'

type Parameters = {
  id: string
}

export const useReadUserQuery = ({ id }: Parameters) =>
  useQuery(
    ['Get user by ID'],
    async () => await read<UserType>(API_ENDPOINTS.users)(id)
  )
