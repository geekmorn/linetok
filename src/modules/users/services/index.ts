import { IUser } from 'common/interfaces'
import { Service } from 'common/service'

export const users = new Service<IUser>('/users')
