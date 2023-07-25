import { useNavigate } from 'react-router-dom'
import { IHotelRatehawk } from '@api/ratehawk/interface/multicomplete'
import { Form, Formik } from 'formik'
import { InputForm } from '@utils/components'
import { SearchRateHawkValidation } from '@api/ratehawk/validations/search'
import moment from '@helpers/moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redux } from '@redux/interfaces/redux'
import { Service } from '@api/redux/interface/state'
import {
  resetHotelInfoState,
  startGetRegionData,
} from '@api/ratehawk/redux/actions/region'
import { setMarkStateAction } from '@api/redux/actions/mark'
import { setMultiReqAction } from '@api/ratehawk/redux/actions/multicomplete'
import { useApi } from '@api/ratehawk/hooks/useApi'
import { startGetHotelSearch } from '@api/ratehawk/redux/actions/hotel'
import { SearchRatehawk } from './search'
import { Rooms } from './rooms'
import { SearchPais } from './paises'
import { scroller } from 'react-scroll'
import { setUtilsRatehawk } from '../../redux/actions/util'

interface IProps {
  isClientModule?: boolean
  isPromo?: boolean
}

export const HotelRatehawk = ({
  isClientModule = true,
  isPromo = false,
}: IProps) => {
  const {
    api: {
      ratehawk: { multicomplete },
    },
    seller: {
      client: { clientActive },
    },
  } = useSelector((i: Redux) => i)
  const { apiRateHawk } = useApi()
  const dispatch = useDispatch()

  const initState: IHotelRatehawk = {
    destination: null,
    type: 'region',
    checkin: moment(new Date()).format('yyyy-MM-DD'),
    checkout: moment(new Date()).add(1, 'day').format('yyyy-MM-DD'),
    residency: 'EC',
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
  }

  const [init, setInit] = useState(initState)

  useEffect(() => {
    if (multicomplete.request) {
      setInit(multicomplete.request)
    }
  }, [multicomplete])

  const navigate = useNavigate()

  return (
    <Formik
      initialValues={init}
      enableReinitialize
      onSubmit={(val) => {
        const { checkin, checkout, guests, destination } = val
        if (apiRateHawk) {
          if (val.type === 'region' && destination?.id) {
            dispatch(
              startGetRegionData(
                {
                  checkin,
                  checkout,
                  guests,
                  language: 'es',
                  region_id: destination.id as number,
                  residency: 'EC',
                },
                apiRateHawk
              )
            )

            isClientModule && !isPromo
              ? navigate('/client/services/Hoteles')
              : scroller.scrollTo('anchorServiceSeller', {
                  duration: 500,
                  delay: 100,
                  smooth: true,
                  offset: -100,
                })
          } else if (val.type === 'hotel') {
            dispatch(startGetHotelSearch(val, apiRateHawk))
            isClientModule && !isPromo
            navigate(`/client/service/hotel/1/${val.destination?.id}`)
          }
        }
        dispatch(setMultiReqAction(val))
        dispatch(resetHotelInfoState())
        dispatch(setMarkStateAction(new Date().getTime().toString()))

        const utilInfo = {
          checkin: val.checkin,
          checkout: val.checkout,
          night: moment(val.checkout).diff(moment(val.checkin), 'days'),
          info: val.info,
          residency: val.residency,
        }
        localStorage.setItem('util', JSON.stringify(utilInfo))

        dispatch(setUtilsRatehawk(utilInfo))
      }}
      validationSchema={SearchRateHawkValidation}
    >
      {({ values, setValues, errors }) => (
        <Form noValidate>
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <div className="w-full md:w-1/3">
              <SearchPais
                setValues={setValues}
                errors={errors}
                apiRateHawk={apiRateHawk as Service}
                values={values}
                isClientModule={isClientModule}
                clientActive={clientActive}
              />
            </div>
            <div className="w-full md:w-1/2">
              <SearchRatehawk
                setValues={setValues}
                errors={errors}
                apiRateHawk={apiRateHawk as Service}
                values={values}
                isClientModule={isClientModule}
                clientActive={clientActive}
              />
            </div>
            <div className="w-full md:w-1/2">
              <Rooms
                values={values}
                setValues={setValues}
                errors={errors}
                disabled={!clientActive && !isClientModule}
              />
            </div>
          </div>
          <div className="flex md:justify-between flex-col md:flex-row gap-3 w-full items-center">
            <div className="w-full md:w-[70%] mt-4">
              <div className="w-full flex gap-3">
                <div className="w-full md:w-1/2">
                  <InputForm
                    name="checkin"
                    text="CheckIn"
                    min={moment(new Date()).format('yyyy-MM-DD')}
                    type="date"
                    className="input-sm 2xl:input-md bg-[#ECECCC]"
                    disabled={!clientActive && !isClientModule}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <InputForm
                    name="checkout"
                    text="CheckOut"
                    type="date"
                    min={moment(new Date()).add(1, 'day').format('yyyy-MM-DD')}
                    className="input-sm 2xl:input-md bg-[#ECECCC]"
                    disabled={!clientActive && !isClientModule}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-sm 2xl:btn-md w-full md:w-1/3 md:mt-9"
              disabled={!clientActive && !isClientModule}
            >
              Buscar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
