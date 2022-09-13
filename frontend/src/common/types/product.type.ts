export type ProductType = {
  id: string
  name: string
  price: number
  amount: number
  description: string
  images?: string[]

  parameter_id?: string
  category_id?: string
}
