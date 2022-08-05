import { useApi } from 'common/hooks'
import { ProductType } from 'common/types'
import { useMutation } from '@tanstack/react-query'

export const useUpdateProductMutation = () => {
  const { update } = useApi<ProductType>('/products')

  return useMutation(
    //
    ['Update the product'],
    (product: ProductType) => update(product.id, product)
  )
}
