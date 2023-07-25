import { HotelInfo } from '@api/ratehawk/interface/hotel'
import {
  RegionAction,
  RegionData,
  RequestRegion,
} from '@api/ratehawk/interface/region'
import { Service } from '@api/redux/interface/state'
import { Fetching, FetchingToken } from '@helpers/fetch'
import { trackPromise } from 'react-promise-tracker'
import Swal from 'sweetalert2'
import {
  GET_HOTEL_INFO,
  GET_REGION_HOTEL,
  RESET_HOTEL_INFO,
  FILTER_HOTEL,
} from '../types'

export const setRegionDataAction = (data: RegionData): RegionAction => ({
  type: GET_REGION_HOTEL,
  payload: {
    data,
  },
})

export const setFilterHotel = (filter?: HotelInfo[]): RegionAction => ({
  type: FILTER_HOTEL,
  payload: {
    filter,
  },
})

export const getHotelInfo = (hotel?: HotelInfo): RegionAction => ({
  type: GET_HOTEL_INFO,
  payload: { aux: hotel },
})

export const resetHotelInfoState = (): RegionAction => ({
  type: RESET_HOTEL_INFO,
})

const startGetHotelInfo =
  (id: string, param?: boolean) =>
  async (dispatch: (val?: RegionAction) => void) => {
    const {
      status,
      data: { hotel },
    } = await trackPromise(
      FetchingToken({
        url: `/hotel/${id}?param=${param || true}`,
        method: 'get',
      }),
      `hotelInfo_${id}`
    )
    if (status === 400) {
    }

    if (status === 200 && hotel) {
      dispatch(getHotelInfo(hotel))
    }
  }

export const startGetRegionData =
  (params: RequestRegion, apiService: Service) =>
  async (dispatch: (val?: RegionAction | unknown) => void) => {
    params.guests.map((param) => {
      if (param.children.length > 0) {
        param.children = param.children.map((child) => Number(child))
      }
      return param
    })

    if (!apiService.api) {
      return Swal.fire({
        title: 'Error crítico',
        text: 'No se pudo obtener la información de la API',
        icon: 'error',
      })
    }

    const auth = {
      username: apiService?.api?.credentials.username || '',
      password: apiService?.api?.credentials.password || '',
    }

    const {
      status,
      data: {
        data: { data },
      },
    } = await trackPromise(
      Fetching({
        url: '/api-query',
        method: 'post',
        data: params,
        headers: {
          'x-path': `${apiService.api.endPoint}/search/serp/region`,
          'x-auth': JSON.stringify(auth),
        },
      }),
      'regionSearch'
    )

    if (status === 200 && data) {
      const hotelData = data as RegionData
      dispatch(setRegionDataAction(hotelData))
      if (hotelData.hotels && hotelData.hotels.length > 0) {
        Swal.fire({
          title: 'Busqueda exitosa',
          text: `Este lugar tiene ${hotelData.hotels.length} hoteles, tomara al rededor de 1 a 2 minutos cargar todos los hoteles`,
          icon: 'error',
        })

        let index = 0
        const iterar = () => {
          if (
            hotelData.hotels &&
            hotelData.hotels.length > 0 &&
            index < hotelData.hotels.length
          ) {
            dispatch(startGetHotelInfo(hotelData.hotels[index].id))
            setTimeout(iterar, 500)
            index++
          }
        }

        iterar()
      }
    }
  }
