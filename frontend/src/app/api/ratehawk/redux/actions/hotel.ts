import { HotelAction, HotelInfo } from '@api/ratehawk/interface/hotel'
import { IHotelRatehawk } from '@api/ratehawk/interface/multicomplete'
import { Rates } from '@api/ratehawk/interface/utils'
import { Service } from '@api/redux/interface'
import { Fetching } from '@helpers/fetch'
import { trackPromise } from 'react-promise-tracker'
import {
  GET_RATES_HOTEL,
  SET_ID_HOTEL,
  GET_HOTEL_INFO_ID,
  SET_TYPE_ROL_HOTEL,
} from '../types'

export const getRatesHotel = (rates: Rates[]): HotelAction => ({
  type: GET_RATES_HOTEL,
  payload: {
    rates,
  },
})

export const setIdHotel = (id: string): HotelAction => ({
  type: SET_ID_HOTEL,
  payload: {
    id,
  },
})

export const setTypeHotel = (type?: 'Client' | 'Seller'): HotelAction => ({
  type: SET_TYPE_ROL_HOTEL,
  payload: {
    type,
  },
})

export const getHotelInfo = (info: HotelInfo): HotelAction => ({
  type: GET_HOTEL_INFO_ID,
  payload: {
    info,
  },
})

export const startGetHotelInfo =
  (id: string, apiService: Service) =>
  async (dispatch: (val?: HotelAction) => void) => {
    const auth = {
      username: apiService?.api?.credentials.username || '',
      password: apiService?.api?.credentials.password || '',
    }

    const { status, data } = await trackPromise(
      Fetching({
        url: '/api-query',
        method: 'post',
        data: {
          language: 'es',
          id,
        },
        headers: {
          'x-path': `${apiService?.api?.endPoint}/hotel/info/`,
          'x-auth': JSON.stringify(auth),
        },
      }),
      `hotelSearch`
    )

    if (status === 200) {
      dispatch(getHotelInfo(data.data.data))
    }
  }

export const startGetRates =
  (params: IHotelRatehawk, apiService: Service) =>
  async (dispatch: (val?: HotelAction) => void) => {
    const auth = {
      username: apiService?.api?.credentials.username || '',
      password: apiService?.api?.credentials.password || '',
    }

    const { status, data } = await trackPromise(
      Fetching({
        url: '/api-query',
        method: 'post',
        data: {
          ...params,
          id: params.destination?.id,
        },
        headers: {
          'x-path': `${apiService?.api?.endPoint}/search/hp`,
          'x-auth': JSON.stringify(auth),
        },
      }),
      'hotelSearch'
    )

    if (status === 200) {
      const result = data.data.data.hotels
      console.log(result)
      if (result.length > 0) {
        dispatch(getRatesHotel(result[0].rates))
      }
    }
  }

export const startGetHotelSearch =
  (params: IHotelRatehawk, apiService: Service) =>
  async (dispatch: (val?: any) => void) => {
    const id = params.destination?.id as string

    if (id) {
      dispatch(setIdHotel(id))
      dispatch(startGetHotelInfo(id, apiService))
    }

    params.guests.map((param) => {
      if (param.children.length > 0) {
        param.children = param.children.map((child) => Number(child))
      }
      return param
    })

    dispatch(startGetRates(params, apiService))
  }
