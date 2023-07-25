import {
  MulticompleteState,
  MulticompleteAction,
} from '@api/ratehawk/interface/multicomplete'
import { GET_MULTI_DATA, SET_MULTI_REQUEST } from '../types'

const init: MulticompleteState = {
  data: {
    hotels: [],
    regions: [],
  },
}

export const MulticompleteReducer = (
  state = init,
  { type, payload }: MulticompleteAction
): MulticompleteState => {
  switch (type) {
    case GET_MULTI_DATA:
      state = { ...state, ...payload?.data }
      break
    case SET_MULTI_REQUEST:
      state = { ...state, request: payload?.request }
      break
  }

  return state
}
