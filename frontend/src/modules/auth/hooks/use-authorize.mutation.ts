import { API_ENDPOINTS } from 'common/constants'
import { SignInType } from 'common/types'
import { create } from 'common/utils'
import { useMutation } from '@tanstack/react-query'

export const useAuthorizeMutation = () =>
  useMutation(
    ['Authorize current user'],
    async (payload: SignInType) =>
      await create<SignInType>(API_ENDPOINTS.auth)(payload)
  )
