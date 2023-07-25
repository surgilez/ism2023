export type Role = 'admin' | 'client' | 'seller'

export interface User {
  uid?: string
  name: string
  lastName: string
  email: string
  online: boolean
  rol?: Role
  img: string
}

export interface UserState extends User {
  phone: string
  doc?: string
  sellerId?: string
  commission?: number
}

export interface UserAction {
  type: string
  payload?: UserState
}
