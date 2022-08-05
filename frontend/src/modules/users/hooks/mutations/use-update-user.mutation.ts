import { useApi } from 'common/hooks'
import { UserType } from 'common/types'
import { useMutation } from '@tanstack/react-query'

export const useUpdateUserMutation = () => {
  const { update } = useApi<UserType>('/users')

  return useMutation(
    //
    ['Update the user'],
    (user: UserType) => update(user.id, user)
  )
}
