import { API } from 'common/constants'
import { UserType } from 'common/types'
import { create } from 'common/utils'
import { useMutation } from '@tanstack/react-query'

export const useCreateUserMutation = () =>
  useMutation(
    ['Create a user'],
    async (payload: UserType) => await create<UserType>(API.users, payload)
  )
