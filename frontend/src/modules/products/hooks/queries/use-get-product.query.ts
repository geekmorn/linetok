import { useApi } from 'common/hooks'
import { ProductType } from 'common/types'
import { useQuery } from '@tanstack/react-query'

type ParametersType = {
  id: string
}

export const useGetProductQuery = ({ id }: ParametersType) => {
  const { get } = useApi<ProductType>('/products')

  return useQuery(
    //
    ['Get product by ID'],
    () => get(id)
  )
}
