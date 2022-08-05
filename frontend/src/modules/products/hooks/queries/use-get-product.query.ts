import { useApi } from 'common/hooks'
import { ProductType } from 'common/types'
import { useQuery } from '@tanstack/react-query'

interface Parameters {
  id: string
}

export const useGetProductQuery = ({ id }: Parameters) => {
  const { get } = useApi<ProductType>('/products')

  return useQuery(
    //
    ['Get product by ID'],
    () => get(id)
  )
}
