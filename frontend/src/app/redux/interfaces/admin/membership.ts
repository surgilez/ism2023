import { Membership } from '@utils/interfaces'

export interface MembershipState {
  list?: Membership[]
  active?: Membership
  aux?: any
}

export interface MembershipAction {
  type: string
  payload?: MembershipState
}
