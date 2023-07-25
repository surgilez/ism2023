import {
  PromoAdminState,
  PromoAdminAction,
} from '@redux/interfaces/admin/promo'
import {
  SET_LIST_PROMO,
  ACTIVE_PROMO,
  DELETE_PROMO,
  UPDATE_PROMO,
  ADD_NEW_PROMO,
  MODAL_PROMO_OPEN,
  MODAL_PROMO_INDEX,
  MODAL_PROMO_HOTEL,
} from '@redux/types'

const init: PromoAdminState = {
  list: [],
}

export const PromoAdminReducer = (
  state = init,
  { type, payload }: PromoAdminAction
): PromoAdminState => {
  switch (type) {
    case SET_LIST_PROMO:
      state = { ...state, list: payload?.list }
      break
    case ACTIVE_PROMO:
      state = { ...state, active: payload?.active }
      break
    case DELETE_PROMO:
      if (state.list) {
        state = {
          ...state,
          list: state.list.filter(({ id }) => state.active?.id !== id),
          active: init.active,
        }
      }
      break
    case UPDATE_PROMO:
      if (state.list) {
        state = {
          ...state,
          list: state.list.map((promo) =>
            promo.id === payload?.aux.id ? payload?.aux : promo
          ),
        }
      }
      break
    case ADD_NEW_PROMO:
      if (state.list) {
        state = { ...state, list: [...state.list, payload?.aux] }
      } else {
        state = { ...state, list: [payload?.aux] }
      }
      break
    case MODAL_PROMO_OPEN:
      if (state.modal) {
        state = { ...state, modal: { ...state.modal, ...payload?.aux } }
      } else {
        state = { ...state, modal: { ...payload?.aux } }
      }
      break
    case MODAL_PROMO_INDEX:
      if (state.modal) {
        state = { ...state, modal: { ...state.modal, index: payload?.aux } }
      }
      break
    case MODAL_PROMO_HOTEL:
      if (state.modal) {
        state = { ...state, modal: { ...state.modal, data: payload?.aux } }
      }
    default:
  }
  return state
}
