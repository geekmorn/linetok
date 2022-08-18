export type UserType = {
  id: number
  name: string
  active: boolean
  role: string
}

export type ProductType = {
  id: number
  name: string
  price: number
  available: boolean
}

export type AuthorizationType = {
  email: string
  password: string
}

export type RegistrationType = AuthorizationType
