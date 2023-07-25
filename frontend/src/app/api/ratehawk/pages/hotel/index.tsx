import { useApi } from '@api/ratehawk/hooks/useApi'
import {
  startGetHotelInfo,
  startGetRates,
} from '@api/ratehawk/redux/actions/hotel'
import { Redux } from '@redux/interfaces/redux'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { animateScroll as scroll } from 'react-scroll'
import moment from '@helpers/moment'
import {
  HotelSearchMulticomplete,
  IHotelRatehawk,
} from '@api/ratehawk/interface/multicomplete'
import { DetailHotelRender } from './info'

export const HotelInfoRatehawk = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { info } = useSelector((i: Redux) => i.api.ratehawk.hotel)
  const { apiRateHawk } = useApi()

  useEffect(() => {
    scroll.scrollToTop()
  }, [])

  useEffect(() => {
    if (!info && id && apiRateHawk) {
      dispatch(startGetHotelInfo(id, apiRateHawk))
    }
  }, [info, dispatch, id, apiRateHawk])

  useEffect(() => {
    const utilStorage = localStorage.getItem('util')
    let util = null
    if (utilStorage) {
      util = JSON.parse(utilStorage)
    }

    if (id && apiRateHawk) {
      const data = {
        type: 'hotel',
        destination: {
          id,
        } as HotelSearchMulticomplete,
        checkin: util?.checkin || moment(new Date()).format('yyyy-MM-DD'),
        checkout:
          util?.checkout ||
          moment(new Date()).add(1, 'day').format('yyyy-MM-DD'),
        guests: [
          {
            adults: 2,
            children: [],
          },
        ],
        info: {
          people: 2,
          rooms: 1,
        },
      } as IHotelRatehawk

      dispatch(startGetRates(data, apiRateHawk))
    }
  }, [dispatch, id, apiRateHawk])

  return (
    <div>
      {!info ? (
        <div className="w-full grid place-content-center min-h-[90vh]">
          <span className="block text-white text-xl">
            No existen registros para el hotel consultado
          </span>
        </div>
      ) : (
        <DetailHotelRender info={info} />
      )}
    </div>
  )
}
