/* eslint-disable default-param-last */
import { UtilsState, UtilsAction } from '@redux/interfaces/utils'
import { SET_PAGE, SET_TYPE_PAGE } from '../types'

const init: UtilsState = {
  page: 1,
}

export const UtilsReducer = (
  state = init,
  { type, payload }: UtilsAction
): UtilsState => {
  switch (type) {
    case SET_PAGE:
      state = {
        ...state,
        page: payload?.page || 1,
      }
      break
    case SET_TYPE_PAGE:
      state = { ...state, typePag: payload?.typePag }
      break

    default:
  }
  return state
}
