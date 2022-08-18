import { API } from 'common/constants'
import { AuthorizationType } from 'common/types'
import { create } from 'common/utils'
import { useMutation } from '@tanstack/react-query'

export const useAuthorizeMutation = () =>
  useMutation(
    ['Authorize current user'],
    async (payload: AuthorizationType) =>
      await create<AuthorizationType>(API.auth, payload)
  )
