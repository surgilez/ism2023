import {
  SellerClientState,
  SellerClientAction,
} from '@redux/interfaces/client/seller'
import { GET_SELLER_CLIENT } from '@redux/types'

const init: SellerClientState = {
  id: '',
  email: '',
  commission: 0,
  name: '',
  lastName: '',
}

export const SellerClientReducer = (
  state = init,
  { type, payload }: SellerClientAction
): SellerClientState => {
  switch (type) {
    case GET_SELLER_CLIENT:
      state = { ...payload }
    default:
  }

  return state
}
