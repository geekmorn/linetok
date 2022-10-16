import { API } from 'common/constants'
import { ProductType } from 'common/types'
import { read } from 'common/utils'
import { ProductsProps } from 'pages/admin/products'
import { useQuery } from '@tanstack/react-query'

type ParametersType = Pick<ProductsProps, 'initialData'>

export const useReadProductsQuery = ({ initialData }: ParametersType) =>
  useQuery(
    ['Read all products'],
    async () => await read<ProductType[]>(API.products),
    {
      initialData
    }
  )
