import { UtilRatehawkAction, UtilRatehawkState } from '../../interface/util'
import { SET_UTILS_HOTEL } from '../types'

export const setUtilsRatehawk = (
  payload: UtilRatehawkState
): UtilRatehawkAction => ({
  type: SET_UTILS_HOTEL,
  payload,
})
