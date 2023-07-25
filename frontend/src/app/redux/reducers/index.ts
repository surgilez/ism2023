import { LOGOUT } from '@redux/types/auth/login'
import { combineReducers } from '@reduxjs/toolkit'
import { ApiHackReducers } from '@api/redux/reducer'
import { AuthReducer } from './auth'
import { UserReducer } from './user'
import { ShoppingReducer } from './shopping'
import {
  AdminSellersReducer,
  ClientReducer,
  MembershipReducer,
  ReportsAdminReducer,
  PromoAdminReducer,
  AdminProvidersReducer,
  ConfigReducer,
} from './admin'
import { ChatReducer } from './chat'
import { HistoryReducer } from './history'
import { UtilsReducer } from './utils'
import { ClientSellerReducer } from './seller'
import { MembershipClientReducer, PaymentReducer } from './client'
import { SellerClientReducer } from './client'

const reducers = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  chat: ChatReducer,
  provider: AdminProvidersReducer,
  shopping: ShoppingReducer,
  history: HistoryReducer,
  admin: combineReducers({
    client: ClientReducer,
    membership: MembershipReducer,
    seller: AdminSellersReducer,
    reports: ReportsAdminReducer,
    promo: PromoAdminReducer,
    config: ConfigReducer,
  }),
  seller: combineReducers({
    client: ClientSellerReducer,
  }),
  client: combineReducers({
    membership: MembershipClientReducer,
    payment: PaymentReducer,
    seller: SellerClientReducer,
  }),
  api: ApiHackReducers,
  utils: UtilsReducer,
})

const rootReducer = (state: any, action: any) => {
  if (action.type === LOGOUT) {
    return reducers(undefined, action)
  }
  return reducers(state, action)
}

export default rootReducer
