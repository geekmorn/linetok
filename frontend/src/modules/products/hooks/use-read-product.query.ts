import { API } from 'common/constants'
import { ProductType } from 'common/types'
import { read } from 'common/utils'
import { useQuery } from '@tanstack/react-query'

type ParametersType = Pick<ProductType, 'id'>

export const useReadProductQuery = ({ id }: ParametersType) =>
  useQuery(
    ['Read product by ID'],
    async () => await read<ProductType>(API.products, id)
  )
