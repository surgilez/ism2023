/* eslint-disable default-param-last */
import { SellerState, SellerAction } from '@redux/interfaces/admin'
import {
  ADD_NEW_SELLER,
  ACTIVE_SELLER,
  EDIT_SELLER,
  SUSPENSE_SELLER,
  GET_SELLERS,
  SET_TOTAL_REGISTROS_SELLER,
  GET_ALL_SELLERS,
} from '@redux/types'

const init: SellerState = {
  list: {
    accounts: [],
    totalResults: 0,
  },
}

export const AdminSellersReducer = (
  state = init,
  { type, payload }: SellerAction
): SellerState => {
  switch (type) {
    case GET_SELLERS:
      state = { ...state, list: payload?.list }
      break
    case ADD_NEW_SELLER:
      if (state.list) {
        if (state.list.accounts) {
          state = {
            ...state,
            list: {
              ...state.list,
              accounts: [...state.list.accounts, payload?.aux],
            },
          }
        } else {
          state = {
            ...state,
            list: {
              ...state.list,
              accounts: [payload?.aux],
            },
          }
        }
      }
      break
    case ACTIVE_SELLER:
      state = { ...state, active: payload?.active }
      break
    case EDIT_SELLER:
      if (state.list && state.list.accounts) {
        state = {
          ...state,
          list: {
            ...state.list,
            accounts: state.list.accounts.map((seller) =>
              seller.id === payload?.aux.id ? payload?.aux : seller
            ),
          },
        }
      }
      break
    case SUSPENSE_SELLER:
      if (state.list && state.list.accounts && payload?.aux) {
        state = {
          ...state,
          list: {
            ...state.list,
            accounts: state.list.accounts.map((seller) =>
              payload.aux && payload?.aux.id === seller.id
                ? payload.aux
                : seller
            ),
          },
          active: payload.aux,
        }
      }
      break
    case SET_TOTAL_REGISTROS_SELLER:
      if (state.list) {
        state = {
          ...state,
          list: { ...state.list, totalResults: payload?.aux },
        }
      }
      break
    case GET_ALL_SELLERS:
      state = { ...state, allSellers: payload?.aux }
    default:
  }
  return state
}
