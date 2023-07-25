/* eslint-disable default-param-last */
import { HotelState, HotelAction } from '@api/ratehawk/interface/hotel'
import {
  GET_RATES_HOTEL,
  SET_ID_HOTEL,
  GET_HOTEL_INFO_ID,
  SET_TYPE_ROL_HOTEL,
} from '../types'

const init: HotelState = {
  type: 'Client',
}

export const HotelReducer = (state = init, { type, payload }: HotelAction) => {
  switch (type) {
    case GET_RATES_HOTEL:
      state = { ...state, rates: payload?.rates }
      break
    case SET_ID_HOTEL:
      state = { ...state, id: payload?.id }
      break
    case GET_HOTEL_INFO_ID:
      state = { ...state, info: payload?.info }
      break
    case SET_TYPE_ROL_HOTEL:
      state = { ...state, type: payload?.type }
      break
    default:
  }

  return state
}
