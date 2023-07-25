import type { Client } from '@utils/interfaces'

export interface ClientSellerState {
  list?: {
    accounts: Client[]
    totalResults?: number
  }
  clientActive?: Client
}

export interface ClientSellerAction {
  type: string
  payload?: ClientSellerState
}
