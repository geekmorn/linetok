import { ProductsService } from 'modules/products/services'
import { useQuery } from '@tanstack/react-query'

export const useGetProductsQuery = () => {
  return useQuery(['Get all products'], () => ProductsService.getAll())
}
