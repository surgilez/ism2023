import { ClientSellerAction, ClientSellerState } from '@redux/interfaces/seller'
import { GET_CLIENT_SELLER_LIST, ACTIVE_CLIENT } from '@redux/types'

const init: ClientSellerState = {
  list: {
    accounts: [],
  },
}

export const ClientSellerReducer = (
  state = init,
  { type, payload }: ClientSellerAction
): ClientSellerState => {
  switch (type) {
    case GET_CLIENT_SELLER_LIST:
      state = { ...state, list: payload?.list }
      break
    case ACTIVE_CLIENT:
      state = { ...state, clientActive: payload?.clientActive }
      break
    default:
  }
  return state
}
