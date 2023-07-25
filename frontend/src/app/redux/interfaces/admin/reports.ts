/* eslint-disable @typescript-eslint/no-explicit-any */
import { MembershipReport, SaleReport } from '@admin/modules/reports/interfaces'

export interface AdminReportState {
  membershipList?: MembershipReport[]
  salesList?: SaleReport[]
  select?: string[] | number[]
  selectSales?: string[] | number[]
  selectReset?: boolean
  selectResetSales?: boolean
  aux?: any
}

export interface AdminReportAction {
  type: string
  payload?: AdminReportState
}
