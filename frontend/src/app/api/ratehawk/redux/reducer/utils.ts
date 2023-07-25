import { UtilRatehawkState, UtilRatehawkAction } from '../../interface/util'
import { SET_UTILS_HOTEL } from '../types'

const init: UtilRatehawkState = {
  checkin: '',
  checkout: '',
  night: 1,
  info: {
    people: 1,
    rooms: 1,
  },
}

export const UtilsReducer = (
  state = init,
  { type, payload }: UtilRatehawkAction
): UtilRatehawkState => {
  switch (type) {
    case SET_UTILS_HOTEL:
      if (payload) {
        state = { ...payload }
      }
      break
    default:
  }

  return state
}
