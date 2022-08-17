export type UserType = {
  id: string
  name: string
  active: boolean
  role: string
}

export type ProductType = {
  id: string
  name: string
  price: number
  available: boolean
}

export type SignUpType = {
  email: string
  password: string
}

export type SignInType = {
  email: string
  password: string
}
