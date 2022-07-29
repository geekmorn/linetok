import { useId } from 'react'
import { products } from 'modules/products/services'
import { useQuery } from '@tanstack/react-query'

export const useGetProductsQuery = () => {
  const uid = useId()
  return useQuery(['Get all products', uid], () => products.getAll())
}
