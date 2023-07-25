/* eslint-disable default-case */
/* eslint-disable default-param-last */
import { RegionState, RegionAction } from '@api/ratehawk/interface/region'
import {
  GET_REGION_HOTEL,
  GET_HOTEL_INFO,
  RESET_HOTEL_INFO,
  FILTER_HOTEL,
} from '../types'

const init: RegionState = {}

export const RegionReducer = (
  state = init,
  { type, payload }: RegionAction
) => {
  switch (type) {
    case GET_REGION_HOTEL:
      state = { ...state, data: payload?.data }
      break
    case GET_HOTEL_INFO:
      if (payload?.aux)
        if (state.hotel) {
          state = {
            ...state,
            hotel: [...state.hotel, payload.aux],
            filter: [...state.hotel, payload.aux],
          }
        } else {
          state = {
            ...state,
            hotel: [payload.aux],
            filter: [payload.aux],
          }
        }
      break
    case RESET_HOTEL_INFO:
      state = { ...state, hotel: [], filter: [] }
      break
    case FILTER_HOTEL:
      state = { ...state, filter: payload?.filter }
      break
  }
  return state
}
