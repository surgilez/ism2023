export interface Sales {
  id?: string
  name?: string
  detail?: string
  price?: number
}
export interface MembershipReport {
  id?: string
  name?: string
  lastName?: string
  doc?: string
  email?: string
  createdAt?: string
  sales?: Sales[]
  salesCurrenMont?: Sales[]
}
