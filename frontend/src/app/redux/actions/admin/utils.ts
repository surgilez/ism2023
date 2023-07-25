import { TtypePag, UtilsAction } from '@redux/interfaces/utils'
import { SET_PAGE, SET_TYPE_PAGE } from '@redux/types'

export const setPageAction = (page: number): UtilsAction => ({
  type: SET_PAGE,
  payload: {
    page,
  },
})

export const setTypePage = (typePag: TtypePag): UtilsAction => ({
  type: SET_TYPE_PAGE,
  payload: {
    typePag,
  },
})
