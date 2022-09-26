import { useMutation } from '@tanstack/react-query'
import { API } from 'common/constants'
import { ProductType } from 'common/types'
import { destroy } from 'common/utils'

export const useDestroyProductMutation = () =>
  useMutation(
    ['Destroy the product'],
    async (id: string) => await destroy<ProductType>(API.products, id)
  )
