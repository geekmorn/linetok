import { API_ENDPOINTS } from 'common/constants'
import { ProductType } from 'common/types'
import { update } from 'common/utils'
import { useMutation } from '@tanstack/react-query'

export const useUpdateProductMutation = () =>
  useMutation(
    ['Update the product'],
    async (product: ProductType) =>
      await update<ProductType>(API_ENDPOINTS.products)(product.id, product)
  )
