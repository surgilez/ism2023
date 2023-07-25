import { MarkAction } from '../interface/mark'
import { SET_MARK_STATE } from '../types'

export const setMarkStateAction = (state: string): MarkAction => ({
  type: SET_MARK_STATE,
  payload: {
    state,
  },
})
