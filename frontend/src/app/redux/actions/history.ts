import { IHistory } from '@client/interface'
import { HistoryAction } from '@redux/interfaces/history'
import { ADD_HISTORY, GET_HISTORY } from '../types'
import { FetchingToken } from '@helpers/fetch'
import { trackPromise } from 'react-promise-tracker'
import { Redux } from '@redux/interfaces/redux'

export const getHistoryAction = (list: IHistory[]): HistoryAction => ({
  type: GET_HISTORY,
  payload: { list },
})

export const addNewHistoryAction = (aux: IHistory[]): HistoryAction => ({
  type: ADD_HISTORY,
  payload: { aux },
})

export const startGetHistory =
  () => async (dispatch: (val?: HistoryAction) => void, redux: () => Redux) => {
    // loader -> getHistory
    ///sales-history/:id

    const { uid } = redux().auth

    const { status, data } = await trackPromise(
      FetchingToken({
        method: 'get',
        url: `/sales-history/${uid}`,
      }),
      'getHistory'
    )

    if (status === 200) {
      const shopping = data.map(({ shopping }: any) => {
        return shopping
      })

      dispatch(getHistoryAction(shopping.flat()))
    }
  }

export const startAddNewHistory =
  (list: IHistory[]) => async (dispatch: (val?: HistoryAction) => void) => {
    dispatch(addNewHistoryAction(list))
  }
