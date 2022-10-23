import { API } from 'common/constants'
import { ProductType } from 'common/types'
import { read } from 'common/utils'
import { useQuery } from '@tanstack/react-query'

export const useReadProductByIdQuery = (id: ProductType['id']) =>
  useQuery(
    ['Read product by ID', id],
    async () => await read<ProductType>(API.products, id)
  )
