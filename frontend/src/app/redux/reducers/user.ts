/* eslint-disable default-param-last */
import { UserState, UserAction } from '@redux/interfaces/user'
import { USERINFO } from '@redux/types'

const init: UserState = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  online: false,
  img: '',
  uid: '',
}

export const UserReducer = (
  state = init,
  { type, payload }: UserAction
): UserState => {
  switch (type) {
    case USERINFO:
      state = { ...state, ...payload }
      break
    default:
  }
  return state
}
