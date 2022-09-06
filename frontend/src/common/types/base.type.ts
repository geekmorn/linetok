export type BaseType = {
  id: string
  active: boolean
  created: Date
  updated: Date
}

export type IdType = Pick<BaseType, 'id'>
