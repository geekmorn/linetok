import { API } from 'common/constants'
import { UserType } from 'common/types'
import { update } from 'common/utils'
import { useMutation } from '@tanstack/react-query'

export const useUpdateUserMutation = () =>
  useMutation(
    ['Update the user'],
    async (payload: UserType) => await update(API.users, payload)
  )
