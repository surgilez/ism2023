import { Role } from './user'

export interface Message {
  _id?: string
  from: string
  to: string
  message: string
  createdAt?: Date
  updatedAt?: Date
}

export type typeActiveChat = 'team' | 'client' | 'seller'

export interface Person {
  name: string
  lastName: string
  accountId: string
  address: string
  allowAdviser: boolean | null
  allowChat: boolean | null
  commission: number | null
  doc: string
  id: string
  img: string | null
  phone: string
  sellerId: string | null
  typeSeller: string | null
}

interface RolAccount {
  id?: boolean
  name?: boolean
}

export interface Account {
  password: string
  roleId: string
  state: boolean | null
  online: boolean | null
  refreshToken: string | null
  createdAt: Date | null
  updatedAt: Date | null
  email: string
  id: string
}

export interface UserChat {
  account: Account
  person: Person
  rol: RolAccount
}

export interface ChatState {
  uid?: string
  activeChat?: UserChat // user id for send message
  users?: UserChat[]
  usersFilter?: UserChat[]
  messages?: Message[]
  typeActiveChat?: typeActiveChat
  message?: Message
  chatPageActive?: boolean
  notification?: Message
  call?: boolean
  aux?: any
}

export interface ChatAction {
  type: string
  payload?: ChatState
}
