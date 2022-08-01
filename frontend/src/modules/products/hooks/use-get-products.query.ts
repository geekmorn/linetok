import { products } from 'modules/products/service'
import { useQuery } from '@tanstack/react-query'

export const useGetProductsQuery = () =>
  useQuery(
    //
    ['Get all products'],
    () => products.getAll()
  )
