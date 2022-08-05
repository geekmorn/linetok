import { useApi } from 'common/hooks'
import { UserType } from 'common/types'
import { useMutation } from '@tanstack/react-query'

export const useCreateUserMutation = () => {
  const { create } = useApi<UserType>('/users')

  return useMutation(
    //
    ['Create a user'],
    (user: UserType) => create(user)
  )
}
