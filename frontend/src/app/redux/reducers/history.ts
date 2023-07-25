/* eslint-disable default-param-last */
import { HistoryState, HistoryAction } from '@redux/interfaces/history'
import { IHistory } from '@client/interface'
import { ADD_HISTORY, GET_HISTORY } from '../types'

const init: HistoryState = {}

export const HistoryReducer = (
  state = init,
  { type, payload }: HistoryAction
): HistoryState => {
  switch (type) {
    case GET_HISTORY:
      state = { ...state, list: payload?.list }
      break
    case ADD_HISTORY:
      if (payload?.aux) {
        const data = payload.aux as IHistory[]
        if (state.list) {
          state = { ...state, list: [...state.list, ...data] }
        } else {
          state = { ...state, list: [...data] }
        }
      }
      break
    default:
  }

  return state
}
