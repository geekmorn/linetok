import { API_ENDPOINTS } from 'common/constants'
import { ProductType } from 'common/types'
import { read } from 'common/utils'
import { useQuery } from '@tanstack/react-query'

type ParametersType = {
  initialData?: ProductType[]
}

export const useReadProductsQuery = ({ initialData }: ParametersType) =>
  useQuery(
    ['Read all products'],
    async () => await read<ProductType>(API_ENDPOINTS.products)(),
    { initialData }
  )
