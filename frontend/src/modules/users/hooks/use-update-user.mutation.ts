import { API_ENDPOINTS } from 'common/constants'
import { UserType } from 'common/types'
import { update } from 'common/utils'
import { useMutation } from '@tanstack/react-query'

export const useUpdateUserMutation = () =>
  useMutation(
    ['Update the user'],
    async (user: UserType) => await update(API_ENDPOINTS.users)(user.id, user)
  )
