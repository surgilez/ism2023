/* eslint-disable default-param-last */
/* eslint-disable default-case */
import { MarkState, MarkAction } from '../interface/mark'
import { SET_MARK_STATE } from '../types'

const init: MarkState = {
  state: '',
}

export const MarkReducer = (
  state = init,
  { type, payload }: MarkAction
): MarkState => {
  switch (type) {
    case SET_MARK_STATE:
      if (payload?.state) {
        state = { ...state, state: payload.state }
      }
      break
  }

  return state
}
