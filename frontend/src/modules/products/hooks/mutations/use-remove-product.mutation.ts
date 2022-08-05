import { useApi } from 'common/hooks'
import { ProductType } from 'common/types'
import { useMutation } from '@tanstack/react-query'

export const useRemoveProductMutation = () => {
  const { remove } = useApi<ProductType>('/products')

  return useMutation(
    //
    ['Remove the product'],
    (id: string) => remove(id)
  )
}
