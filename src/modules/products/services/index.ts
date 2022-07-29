import { IProduct } from 'common/interfaces'
import { Service } from 'common/service'

export const products = new Service<IProduct>('/products')
