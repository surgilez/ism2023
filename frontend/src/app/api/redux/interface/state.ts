import { TService } from '@modules/client/interface'

interface Credentials {
  username: string
  password: string
}

export interface ApiService {
  id: number | string
  name: string
  state: boolean
  endPoint: string
  credentials: Credentials
}

export interface Service {
  name: TService
  state: boolean
  profit: number | string
  api?: ApiService
}

export type TAPIService = 'Ratehawk' | 'Restel' | 'Travelopro'
export interface ServiceState {
  list: Service[]
}

export interface ServiceAction {
  type: string
  payload?: ServiceState
}
