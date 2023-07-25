import { IRoles } from '@utils/interfaces/admin/roles'

export interface AuthState {
  uid?: string
  access?: string
  checking?: boolean
  roles?: IRoles[]
}

export interface AuthAction {
  type: string
  payload?: AuthState
}
