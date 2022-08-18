import { API } from 'common/constants'
import { RegistrationType } from 'common/types'
import { create } from 'common/utils'
import { useMutation } from '@tanstack/react-query'

export const useRegisterMutation = () =>
  useMutation(
    ['Register current user'],
    async (payload: RegistrationType) =>
      await create<RegistrationType>(API.users, payload)
  )
