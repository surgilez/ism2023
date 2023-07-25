import { IConfigState, IConfigAction } from '@redux/interfaces/admin'
import { SET_CONFIG_EMAIL } from '@redux/types'

const init: IConfigState = {}

export const ConfigReducer = (
  state = init,
  { type, payload }: IConfigAction
) => {
  switch (type) {
    case SET_CONFIG_EMAIL:
      state = { ...state, email: payload.email }
      break
    default:
  }
  return state
}
