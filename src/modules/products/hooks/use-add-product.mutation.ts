import { useId } from 'react'
import { IProduct } from 'common/interfaces'
import { products } from 'modules/products/service'
import { useMutation } from '@tanstack/react-query'

export const useAddProductMutation = () => {
  const uid = useId()
  return useMutation(['Get all products', uid], (product: IProduct) =>
    products.create(product)
  )
}
