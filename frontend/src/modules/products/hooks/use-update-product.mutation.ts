import { useMutation } from '@tanstack/react-query'
import { API } from 'common/constants'
import { ProductType } from 'common/types'
import { update } from 'common/utils'

export const useUpdateProductMutation = () =>
  useMutation(
    ['Update the product'],
    async (payload: ProductType) =>
      await update<ProductType>(API.products, payload)
  )
