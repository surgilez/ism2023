import { Profile } from '@utils/interfaces'

export interface Seller extends Profile {
  id?: string
  seller?: string
  doc?: string
  allowAdviser: boolean
  allowChat: boolean
  state: boolean
  online?: boolean
  dsto?: string
  person?: Profile
}
