/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProvider } from '@admin/modules/providers/interfaces'

export interface IActiveAction {
  active?: IProvider
  action: 'edit' | 'showServices'
}

export interface AdminProviderState {
  list?: IProvider[]
  active?: IActiveAction
  select?: string[] | number[]
  selectReset?: boolean
  aux?: any
}

export interface AdminProvidersAction {
  type: string
  payload?: AdminProviderState
}
