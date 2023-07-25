import {
  MembershipClientAction,
  MembershipClientState,
} from '@redux/interfaces/client/membership'
import { GET_MEMBERSHIP_CLIENT } from '@redux/types'
const init: MembershipClientState = {}

export const MembershipClientReducer = (
  state = init,
  { type, payload }: MembershipClientAction
): MembershipClientState => {
  switch (type) {
    case GET_MEMBERSHIP_CLIENT:
      state = { ...state, list: payload?.list }
      break
    default:
  }

  return state
}
