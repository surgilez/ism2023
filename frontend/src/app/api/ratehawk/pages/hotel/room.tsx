import { Redux } from '@redux/interfaces/redux'
import { RoomRate } from './rate'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { UtilRatehawkState } from '@api/ratehawk/interface/util'
import moment from '@helpers/moment'

export const Room = () => {
  const {
    api: {
      ratehawk: {
        hotel: { rates },
      },
    },
    user: { rol },
  } = useSelector((i: Redux) => i)
  const navigate = useNavigate()

  const [searchCondition, setSearchCondition] = useState<UtilRatehawkState>({
    checkin: moment(new Date()).format('YYYY-MM-DD'),
    checkout: moment(new Date()).add(1, 'day').format('yyyy-MM-DD'),
    night: 1,
    residency: 'AB',
    info: {
      people: 2,
      rooms: 1,
    },
  })

  useEffect(() => {
    const searchConditionStorage = localStorage.getItem('util')

    if (searchConditionStorage) {
      setSearchCondition(JSON.parse(searchConditionStorage))
    }
  }, [])

  return (
    <div>
      {!rates || rates.length <= 0 ? (
        <div className="min-h-[20vh] grid place-content-center">
          <span className="text-gray-300 text-lg block text-center">
            No existen habitaciones disponibles para el hotel seleccionado
          </span>
        </div>
      ) : (
        <>
          <div>
            <span className="text-2xl font-bold text-gray-200">
              Habitaciones
            </span>
            <small className="text-white ml-3">
              {rates.length} {rates.length === 1 ? 'disponible' : 'disponibles'}
            </small>
          </div>

          {rol && rol !== 'seller' && (
            <div className="text-white my-4">
              <span className="block my-2">Parámetros de búsqueda</span>
              <div className="flex gap-4 text-sm">
                <span>CheckIn: </span>
                <span>{searchCondition?.checkin as string}</span>
              </div>
              <div className="flex gap-4 text-sm">
                <span>CheckOut: </span>
                <span>{searchCondition?.checkout as string}</span>
              </div>
              <div className="flex gap-4 text-sm">
                <span>N. personas: </span>
                <span>{searchCondition?.info.people}</span>
              </div>
              <div className="flex gap-4 text-sm">
                <span>N. noches: </span>
                <span>{searchCondition?.night}</span>
              </div>
              <div className="flex gap-4 text-sm">
                <span>Residencia: </span>
                <span>{searchCondition?.residency}</span>
              </div>
              <button
                className="btn btn-sm mt-5"
                onClick={() => navigate('/', { replace: true })}
              >
                Cambiar parámetros de búsqueda
              </button>
            </div>
          )}
          <div className="rounded-lg mt-2 bg-[#4E5B96] p-5 flex flex-col md:flex-row justify-center  md:flex-wrap gap-4">
            {rates.map((rate, i) => {
              return <RoomRate key={i} rate={rate} />
            })}
          </div>
        </>
      )}
    </div>
  )
}
