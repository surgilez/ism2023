/* eslint-disable default-param-last */
import { MembershipState, MembershipAction } from '@redux/interfaces/admin'
import {
  ADD_NEW_MEMBERSHIP,
  ACTIVE_MEMBERSHIP,
  DELETE_MEMBERSHIP,
  UPDATE_MEMBERSHIP,
  GET_MEMBERSHIP,
  SUSPENSE_MEMBERSHIP,
} from '@redux/types'

const init: MembershipState = {}

export const MembershipReducer = (
  state = init,
  { type, payload }: MembershipAction
) => {
  switch (type) {
    case GET_MEMBERSHIP:
      state = { ...state, list: payload?.list }
      break
    case ADD_NEW_MEMBERSHIP:
      if (state.list && state.list.length > 0) {
        state = { ...state, list: [...state.list, payload?.aux] }
      } else {
        state = { ...state, list: [payload?.aux] }
      }
      break
    case ACTIVE_MEMBERSHIP:
      state = { ...state, active: payload?.active }
      break
    case DELETE_MEMBERSHIP:
      if (state.list) {
        state = {
          ...state,
          list: state.list.filter(({ id }) => state.active?.id !== id),
          active: init.active,
        }
      }
      break
    case UPDATE_MEMBERSHIP:
      if (state.list) {
        state = {
          ...state,
          list: state.list.map((membership) =>
            membership.id === payload?.aux.id ? payload?.aux : membership
          ),
          active: undefined,
        }
      }
      break
    case SUSPENSE_MEMBERSHIP:
      if (payload?.aux && state.list) {
        state = {
          ...state,
          list: state.list.map((item) =>
            item.id === payload.aux.id ? payload.aux : item
          ),
          active: payload.aux,
        }
      }
      break
    default:
  }
  return state
}
