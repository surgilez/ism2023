import { Role } from '@redux/interfaces/user'

export interface IRoles {
  id: string
  name: Role
  state: boolean
  createdAt: Date | string
  updatedAt: Date | string
}
