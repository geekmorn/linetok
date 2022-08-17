import { API_ENDPOINTS } from 'common/constants'
import { SignUpType } from 'common/types'
import { create } from 'common/utils'
import { useMutation } from '@tanstack/react-query'

export const useCreateUserMutation = () =>
  useMutation(
    ['Create a user'],
    async (payload: SignUpType) =>
      await create<SignUpType>(API_ENDPOINTS.users)(payload)
  )
