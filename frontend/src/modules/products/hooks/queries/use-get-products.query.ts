import { useApi } from 'common/hooks'
import { ProductType } from 'common/types'
import { useQuery } from '@tanstack/react-query'

type ParametersType = {
  initialData?: ProductType[]
}

export const useGetProductsQuery = ({ initialData }: ParametersType) => {
  const { getAll } = useApi<ProductType>('/products')

  return useQuery(
    //
    ['Get all products'],
    () => getAll(),
    {
      initialData
    }
  )
}
