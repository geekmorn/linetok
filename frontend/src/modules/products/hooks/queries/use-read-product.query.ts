import { API_ENDPOINTS } from 'common/constants'
import { read } from 'common/utils'
import { useQuery } from '@tanstack/react-query'

type ParametersType = {
  id: string
}

export const useReadProductQuery = ({ id }: ParametersType) =>
  useQuery(
    ['Get product by ID'],
    async () => await read(API_ENDPOINTS.products)(id)
  )
