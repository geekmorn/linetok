import { useApi } from 'common/hooks'
import { UserType } from 'common/types'
import { useMutation } from '@tanstack/react-query'

export const useRemoveUserMutation = () => {
  const { remove } = useApi<UserType>('/users')

  return useMutation(
    //
    ['Remove the user'],
    (id: string) => remove(id)
  )
}
