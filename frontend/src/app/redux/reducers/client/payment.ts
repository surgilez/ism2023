import { PaymentAction, PaymentState } from '@redux/interfaces/client/payment'
import {
  SET_CHECKOUT_ID,
  SET_PAYMENT_STATE,
  PARTNER_ORDER_ID,
} from '@redux/types'

const init: PaymentState = {
  state: 'init',
  checkoutId: '',
}

export const PaymentReducer = (
  state = init,
  { type, payload }: PaymentAction
): PaymentState => {
  switch (type) {
    case SET_CHECKOUT_ID:
      state = { ...state, checkoutId: payload?.checkoutId }
      break
    case SET_PAYMENT_STATE:
      if (payload?.state) {
        state = { ...state, state: payload?.state }
      }
      break
    case PARTNER_ORDER_ID:
      if (payload?.aux) {
        if (state.partnerOrder) {
          state = {
            ...state,
            partnerOrder: [...state.partnerOrder, payload?.aux],
          }
        } else {
          state = { ...state, partnerOrder: [payload.aux] }
        }
      }
      break
    default:
  }
  return state
}
