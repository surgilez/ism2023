import { AdminReportState, AdminReportAction } from '@redux/interfaces/admin'
import {
  GET_MEMBERSHIP_REPORTS,
  SET_LIST_MEMBERSHIP,
  SET_RESET_MEMBERSHIP_REPORT,
  GET_SALES_REPORTS,
  SET_LIST_SALES,
  SET_RESET_SALES_REPORT,
} from '@redux/types'

const init: AdminReportState = {
  membershipList: [],
  salesList: [],
  select: [],
  selectReset: false,
}

export const ReportsAdminReducer = (
  state = init,
  { type, payload }: AdminReportAction
): AdminReportState => {
  switch (type) {
    case GET_MEMBERSHIP_REPORTS:
      state = { ...state, membershipList: payload?.membershipList }
      break
    case SET_LIST_MEMBERSHIP:
      state = { ...state, select: payload?.select }
      break
    case SET_RESET_MEMBERSHIP_REPORT:
      state = { ...state, selectReset: payload?.aux }
      break
    case GET_SALES_REPORTS:
      state = { ...state, salesList: payload?.salesList }
      break
    case SET_LIST_SALES:
      state = { ...state, selectSales: payload?.selectSales }
      break
    case SET_RESET_SALES_REPORT:
      state = { ...state, selectResetSales: payload?.aux }
      break
    default:
  }
  return state
}
