export interface MembershipMotors {
  id?: string
  provider?: string
  service: { id: string; name: string; dsto: number } | string
  dsto?: string | number
}

export interface Membership {
  id?: string
  img?: string | File | null
  serviceId?: string
  name?: string
  state?: boolean
  exp?: string | number | Date
  price?: string | number
  code?: string
  services?: MembershipMotors[]
}

export type NEWMembership = Membership
