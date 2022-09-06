import { IdType } from 'common/types'

export type CategoryType = IdType & {
  name: string
  parameter_id: string
}
