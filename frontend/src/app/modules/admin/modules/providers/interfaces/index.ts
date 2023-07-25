import { TService } from '@modules/client/interface'

export interface IProviderService {
  id?: string
  name: TService
  state: boolean
  profit: number | string
}

export interface IProvider {
  id?: string | number
  name: string
  webPage?: string
  phone?: string
  contact?: string
  country?: string
  state: boolean
  credentials: {
    endPoint: string
    username: string
    password: string
    confirmPassword?: string
  }
  services: IProviderService[]
}
