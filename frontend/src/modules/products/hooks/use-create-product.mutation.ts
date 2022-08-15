import { API_ENDPOINTS } from 'common/constants'
import { ProductType } from 'common/types'
import { create } from 'common/utils'
import { useMutation } from '@tanstack/react-query'

export const useCreateProductMutation = () =>
  useMutation(
    ['Create a product'],
    async (product: ProductType) =>
      await create<ProductType>(API_ENDPOINTS.products)(product)
  )
