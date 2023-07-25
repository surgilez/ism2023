import { TPaymentMethod } from '@api/ratehawk/interface/utils'
import { TAPIService } from '@api/redux/interface'
import { TService } from '@modules/client/interface'

export interface IBill {
  id: string | number
}

export interface IServiceShopping {
  name: TService
  state: boolean
  profit: number
  api: TAPIService
}

export interface MembershipCart {
  name: string
  state: boolean
  dsto: number
  exp: number
}

export interface ShoppingCart {
  id?: string
  id_hash?: string
  book_hash?: string
  match_hash?: string
  base: number
  profit: number
  subtotal: number
  iva: number
  discount: number
  total: number
  img?: string[]
  name?: string
  item_name: string
  description?: string
  email?: string
  date?: string | Date | number
  idBill?: string | number
  payment_methods?: TPaymentMethod
  night: number
  service: IServiceShopping
  membership?: MembershipCart
  testMode?: boolean
  partner?: any
  checkin?: string | Date | number
  checkout?: string | Date | number
  errorBooking?: string
}
