import { useApi } from 'common/hooks'
import { ProductType } from 'common/types'
import { useQuery } from '@tanstack/react-query'

export const useGetProductsQuery = () => {
  const { getAll } = useApi<ProductType>('/products')

  return useQuery(
    //
    ['Get all products'],
    () => getAll()
  )
}
