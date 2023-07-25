import type { Client } from '@utils/interfaces'

export interface ClientState {
  list?: {
    accounts: Client[]
    totalResults: number
  }
  select?: string[] | number[]
  selectReset?: boolean
  clientActive?: Client
  aux?: any
}

export interface ClientAction {
  type: string
  payload?: ClientState
}
