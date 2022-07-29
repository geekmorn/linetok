import { httpClient } from 'common/client'
import { IProduct } from 'common/interfaces'

export class ProductsService {
  /* 
    Products are goods that we sell.
  */
  public static get = async (id: string) =>
    await httpClient
      .get<IProduct>(`/products/${id}`)
      .then((response) => response.data)
      .catch((e) => console.error(e))

  public static getAll = async () =>
    await httpClient
      .get<IProduct[]>('/products')
      .then((response) => response.data)
      .catch((e) => console.error(e))
}
