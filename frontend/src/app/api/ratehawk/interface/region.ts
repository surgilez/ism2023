import { Hotel, HotelInfo } from './hotel'
import { TLanguage, IGuest } from './utils'

export interface RequestRegion {
  region_id: number
  checkin: string | Date
  checkout: string | Date
  residency?: string
  language: TLanguage
  guests: IGuest[]
}

export interface RegionData {
  hotels?: Hotel[]
  total_hotels: number
}

export interface RegionDebug {
  request: RequestRegion
  key_id: string
  validation_error: string | null
}

export interface RegionState {
  data?: RegionData
  debug?: RegionDebug
  hotel?: HotelInfo[]
  filter?: HotelInfo[]
  aux?: HotelInfo
}

export interface RegionAction {
  type: string
  payload?: RegionState
}
