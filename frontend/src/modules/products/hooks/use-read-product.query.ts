import { API } from 'common/constants'
import { ProductType } from 'common/types'
import { read } from 'common/utils'
import { useQuery } from '@tanstack/react-query'

type IdType = Pick<ProductType, 'id'>

export const useReadProductQuery = ({ id }: IdType) =>
  useQuery(
    ['Read product by ID'],
    async () => await read<ProductType>(API.products, id)
  )
