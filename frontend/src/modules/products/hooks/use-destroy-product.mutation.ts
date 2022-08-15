import { API_ENDPOINTS } from 'common/constants'
import { ProductType } from 'common/types'
import { destroy } from 'common/utils'
import { useMutation } from '@tanstack/react-query'

export const useDestroyProductMutation = () =>
  useMutation(
    ['Destroy the product'],
    async (id: string) => await destroy<ProductType>(API_ENDPOINTS.products)(id)
  )
