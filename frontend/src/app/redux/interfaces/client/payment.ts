import { TStatePayment, NewBookingData } from '@client/interface/payment'

export interface PaymentState {
  checkoutId?: string
  state?: TStatePayment
  partnerOrder?: NewBookingData[]
  aux?: NewBookingData
}

export interface PaymentAction {
  type: string
  payload?: PaymentState
}
