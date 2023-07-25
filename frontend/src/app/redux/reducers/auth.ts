/* eslint-disable default-param-last */
import { AuthState, AuthAction } from '@redux/interfaces/auth'
import { REGISTER, SIGNIN, CHECK, ROLES } from '@redux/types'

const init: AuthState = {
  uid: '',
  access: '',
  checking: false,
}

export const AuthReducer = (
  state = init,
  { type, payload }: AuthAction
): AuthState => {
  switch (type) {
    case SIGNIN:
      if (payload) state = { ...state, ...payload }
      break
    case REGISTER:
      break
    case CHECK:
      state = { ...state, checking: payload?.checking }
      break
    case ROLES:
      state = { ...state, roles: payload?.roles }
      break
    default:
  }
  return state
}
