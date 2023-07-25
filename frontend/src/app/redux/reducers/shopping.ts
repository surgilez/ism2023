/* eslint-disable default-param-last */
import { ShoppingCart } from '@modules/shopping/interface'
import { ShoppingState, ShoppingAction } from '@redux/interfaces/shopping'
import {
  GET_SHOPPING,
  ADD_NEW_ITEM,
  DELETE_ITEM,
  DELETE_ALL_ITEMS,
  GET_BILL,
  ADD_NIGHT,
  SET_TOTAL,
  DELETE_VAL_ITEM,
  CART_ORDER_ID,
} from '../types'

const init: ShoppingState = {
  shopping: [],
  total: 0,
  tax: 0,
  hash_assistant: false,
}

export const ShoppingReducer = (
  state = init,
  { type, payload }: ShoppingAction
): ShoppingState => {
  switch (type) {
    case GET_SHOPPING:
      state = {
        ...state,
        shopping: payload?.shopping,
      }
      break
    case GET_BILL:
      state = { ...state, bill: payload?.bill }
      break
    case SET_TOTAL:
      if (payload?.aux) {
        state = { ...state, total: payload?.aux as number }
      }
      break
    case CART_ORDER_ID:
      if (payload?.aux && state.shopping) {
        state = {
          ...state,
          shopping: state.shopping.map((item) =>
            item.id === payload?.aux.id ? payload?.aux : item
          ),
        }
      }
      break

    case DELETE_ITEM:
      if (payload?.aux && state.total !== 0) {
        const shoppingAux = payload.aux
        const total = Number(state.total) - shoppingAux.total

        state = {
          ...state,
          shopping: [...shoppingAux.Car],
          total,
        }
      }
      break
    case DELETE_VAL_ITEM:
      if (payload?.aux && state.total !== 0) {
        const shoppingAux = payload.aux
        const total = Number(state.total) - shoppingAux.total
        if (state.shopping) {
          state = {
            ...state,
            shopping: state.shopping.filter(
              (item) => item.id !== shoppingAux.id
            ),
            total,
          }
        }
      }
      break
    case DELETE_ALL_ITEMS:
      state = init
      break
    case ADD_NIGHT:
      if (state.shopping && payload?.aux) {
        const shoppingAux = payload.aux as ShoppingCart
        state = {
          ...state,
          shopping: state.shopping.map((shopping) =>
            shoppingAux.id === shopping.id ? shoppingAux : shopping
          ),
        }
      }
      break
    case ADD_NEW_ITEM:
      if (payload?.aux) {
        const data = payload?.aux as ShoppingCart
        if (state.shopping) {
          state = {
            ...state,
            shopping: [...state.shopping, data],
          }
        } else {
          state = {
            ...state,
            shopping: [data],
          }
        }
      }
      break
    default:
  }

  return state
}
