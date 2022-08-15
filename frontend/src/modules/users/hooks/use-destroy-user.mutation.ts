import { API_ENDPOINTS } from 'common/constants'
import { UserType } from 'common/types'
import { destroy } from 'common/utils'
import { useMutation } from '@tanstack/react-query'

export const useDestroyUserMutation = () =>
  useMutation(
    ['Destroy the user'],
    async (id: string) => await destroy<UserType>(API_ENDPOINTS.users)(id)
  )
