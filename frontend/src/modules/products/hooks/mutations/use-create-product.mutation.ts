import { useApi } from 'common/hooks'
import { ProductType } from 'common/types'
import { useMutation } from '@tanstack/react-query'

export const useCreateProductMutation = () => {
  const { create } = useApi<ProductType>('/products')

  return useMutation(
    //
    ['Create a product'],
    (product: ProductType) => create(product)
  )
}
