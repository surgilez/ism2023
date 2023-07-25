/* eslint-disable @typescript-eslint/no-explicit-any */
import { PromoAdmin } from '@admin/modules/promotions/interfaces'
import { PromoModal } from '../../../modules/admin/modules/promotions/interfaces/index'

export interface PromoAdminState {
  list?: PromoAdmin[]
  active?: PromoAdmin
  modal?: PromoModal
  aux?: any
}

export interface PromoAdminAction {
  type: string
  payload?: PromoAdminState
}
