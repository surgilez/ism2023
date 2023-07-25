import { AuthState } from './auth'
import { ChatState } from './chat'
import { ClientSellerState } from './seller'
import { HistoryState } from './history'
import { HotelState } from '@api/ratehawk/interface/hotel'
import { MarkState, ServiceState } from '@api/redux/interface'
import {
  MembershipClientState,
  PaymentState,
  SellerClientState,
} from './client'
import { MulticompleteState } from '@api/ratehawk/interface/multicomplete'
import { RegionState } from '@api/ratehawk/interface/region'
import { ShoppingState } from './shopping'
import { UserState } from './user'
import { UtilRatehawkState } from '@api/ratehawk/interface/util'
import { UtilsState } from './utils'
import {
  ClientState,
  MembershipState,
  SellerState,
  AdminReportState,
  PromoAdminState,
  AdminProviderState,
  IConfigState,
} from './admin'

export interface Redux {
  auth: AuthState
  user: UserState
  chat: ChatState
  provider: AdminProviderState
  shopping: ShoppingState
  history: HistoryState
  admin: {
    client: ClientState
    membership: MembershipState
    seller: SellerState
    reports: AdminReportState
    promo: PromoAdminState
    config: IConfigState
  }
  seller: {
    client: ClientSellerState
  }
  client: {
    membership: MembershipClientState
    payment: PaymentState
    seller: SellerClientState
  }
  api: {
    ratehawk: {
      multicomplete: MulticompleteState
      region: RegionState
      hotel: HotelState
      util: UtilRatehawkState
    }
    services: ServiceState
    mark: MarkState
  }
  utils: UtilsState
}
