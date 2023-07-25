import { ValueInputRooms } from './multicomplete'

export interface UtilRatehawkState {
  checkin: Date | string
  checkout: Date | string
  night: number
  info: ValueInputRooms
  residency?: string
}

export interface UtilRatehawkAction {
  type: string
  payload?: UtilRatehawkState
}
