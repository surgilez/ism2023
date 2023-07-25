import { MembershipInfo } from '@admin/modules/membership/interfaces'

export interface Client {
  id?: string | number
  name?: string
  doc?: string
  lastName?: string
  email?: string
  state?: boolean
  membershipInfo?: MembershipInfo[]
  seller?: string
}
