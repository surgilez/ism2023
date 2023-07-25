import { TDestination, TLanguage, TRegionSearch, IGuest } from './utils'

export interface MultiCompleteSearch {
  query: string
  language: TLanguage
}

export interface HotelSearchMulticomplete {
  id: string
  name: string
  region_id: number
}

export interface RegionSearchMulticomplete {
  id: number
  name: string
  type: TRegionSearch
  country_code: string
}

export interface ValueInputRooms {
  rooms: number
  people: number
}

export interface IHotelRatehawk {
  destination: HotelSearchMulticomplete | RegionSearchMulticomplete | null
  type: TDestination
  checkin: string | Date
  checkout: string | Date
  guests: IGuest[]
  info: ValueInputRooms
  residency?: string
}

export interface MulticompleteData {
  hotels: HotelSearchMulticomplete[]
  regions: RegionSearchMulticomplete[]
}

export interface MulticompleteState {
  data?: MulticompleteData
  debug?: {
    key_id: string
    validation_error: string | null
    request: {
      query: string
      language: TLanguage
    }
  }
  request?: IHotelRatehawk
  status?: string
  error?: string | null
}

export interface MulticompleteAction {
  type: string
  payload?: MulticompleteState
}
