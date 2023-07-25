/* eslint-disable @typescript-eslint/no-explicit-any */
import { Seller } from '@admin/modules/sellers/interfaces'

export interface SellerState {
  list?: {
    accounts: Seller[]
    totalResults: number
  }
  allSellers?: Seller[]
  active?: Seller
  aux?: any
}

export interface SellerAction {
  type: string
  payload?: SellerState
}
