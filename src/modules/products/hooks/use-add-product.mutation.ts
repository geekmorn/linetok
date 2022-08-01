import { IProduct } from 'common/interfaces'
import { products } from 'modules/products/service'
import { useMutation } from '@tanstack/react-query'

export const useAddProductMutation = () =>
  useMutation(
    //
    ['Add new product'],
    (product: IProduct) => products.create(product)
  )
