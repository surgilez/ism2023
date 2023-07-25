import { Membership } from '@utils/interfaces'

export interface MembershipClientState {
  list?: Membership[]
}

export interface MembershipClientAction {
  type: string
  payload?: MembershipClientState
}
