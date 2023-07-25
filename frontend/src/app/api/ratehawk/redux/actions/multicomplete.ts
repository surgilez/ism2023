import {
  IHotelRatehawk,
  MulticompleteAction,
  MultiCompleteSearch,
  MulticompleteState,
} from '@api/ratehawk/interface/multicomplete'
import { Service } from '@api/redux/interface/state'
import { Fetching } from '@helpers/fetch'
import { trackPromise } from 'react-promise-tracker'
import { GET_MULTI_DATA, SET_MULTI_REQUEST } from '../types'

export const setMultiDataAction = (
  payload: MulticompleteState
): MulticompleteAction => ({
  type: GET_MULTI_DATA,
  payload,
})

export const setMultiReqAction = (
  request: IHotelRatehawk
): MulticompleteAction => ({
  type: SET_MULTI_REQUEST,
  payload: {
    request,
  },
})

export const startGetMulticompleteData =
  (params: MultiCompleteSearch, apiService: Service) =>
  async (dispatch: (val?: MulticompleteAction) => void) => {
    const auth = {
      username: apiService?.api?.credentials.username || '',
      password: apiService?.api?.credentials.password || '',
    }
    const { status, data } = await trackPromise(
      Fetching({
        url: '/api-query',
        method: 'post',
        data: params,
        headers: {
          'x-path': `${apiService?.api?.endPoint}/search/multicomplete/`,
          'x-auth': JSON.stringify(auth),
        },
      }),
      'multicompleteSearch'
    )

    if (status === 200) {
      dispatch(setMultiDataAction(data))
    }
  }
