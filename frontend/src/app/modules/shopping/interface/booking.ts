import { ShoppingCart } from './index'
export type TBookingState = 'init' | 'loading' | 'success' | 'error'

export interface BookingCart {
  total: number
  cart: ShoppingCart[]
}
