/* eslint-disable camelcase */
import { TDestination } from '@api/ratehawk/interface/utils'
import {
  HotelSearchMulticomplete,
  IHotelRatehawk,
  MultiCompleteSearch,
  RegionSearchMulticomplete,
} from '@api/ratehawk/interface/multicomplete'
import { Redux } from '@redux/interfaces/redux'
import { ChangeEvent, SetStateAction, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Service } from '@api/redux/interface/state'
import { startGetMulticompleteData } from '@api/ratehawk/redux/actions/multicomplete'
import { usePromiseTracker } from 'react-promise-tracker'
import { ComponentLoader } from '@utils/components/loader'
import { CountryByCode } from '@helpers/countries'
import { FormikErrors } from 'formik'
import { useDebounce } from '@utils/hooks/useDebounce'
import { Client } from '@utils/interfaces'

interface IProps {
  values: IHotelRatehawk
  setValues: (
    values: SetStateAction<IHotelRatehawk>,
    shouldValidate?: boolean | undefined
  ) => void
  errors: FormikErrors<IHotelRatehawk>
  apiRateHawk: Service
  isClientModule?: boolean
  clientActive?: Client
}

export const SearchRatehawk = ({
  setValues,
  errors,
  apiRateHawk,
  values,
  isClientModule = true,
  clientActive,
}: IProps) => {
  const dispatch = useDispatch()
  const { promiseInProgress } = usePromiseTracker({
    area: 'multicompleteSearch',
  })

  const { data } = useSelector((i: Redux) => i.api.ratehawk.multicomplete)
  const init: MultiCompleteSearch = {
    language: 'es',
    query: '',
  }

  const [valueForm, setValueForm] = useState(init)
  const { handleSetTimeOut } = useDebounce()

  useEffect(() => {
    const { destination } = values
    if (destination?.name) {
      setValueForm((val) => ({ ...val, query: destination.name }))
    }
  }, [values])

  const refSearchBox = useRef<HTMLDivElement>(null)
  const refInputBox = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    const box = refSearchBox.current
    const input = refInputBox.current

    const handleEvent = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (box && !box.contains(target) && input !== target) {
        setFocused(false)
      }
      if (input === target) {
        setFocused(true)
      }
    }

    document.addEventListener('click', handleEvent)
    return () => document.removeEventListener('click', handleEvent)
  }, [refSearchBox, refInputBox, setFocused])

  const handleInput = () =>
    handleSetTimeOut(() => {
      if (apiRateHawk)
        dispatch(startGetMulticompleteData(valueForm, apiRateHawk))
    }, 800)

  const handleInputChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setValueForm((val) => ({ ...val, query: value }))
  }

  const handleSetDestination = (
    val: HotelSearchMulticomplete | RegionSearchMulticomplete,
    type: TDestination
  ) => {
    if (apiRateHawk && val) {
      setValues((arg) => ({ ...arg, destination: val, type }))
      setValueForm((v) => ({ ...v, query: val.name }))
      dispatch(
        startGetMulticompleteData(
          { ...valueForm, query: val.name },
          apiRateHawk
        )
      )
    }
  }

  return (
    <div className="w-full relative">
      <span className="">Destino</span>

      <div className="w-full">
        <input
          type="text"
          className="input input-sm 2xl:input-md bordered input-primary w-full bg-[#ECECCC]"
          placeholder="Ciudad, Hotel o Aeropuerto"
          value={valueForm.query}
          onChange={handleInputChange}
          onKeyUp={handleInput}
          ref={refInputBox}
          onKeyPress={(e) => {
            setFocused(true)
            // eslint-disable-next-line no-unused-expressions
            e.which === 13 && e.preventDefault()
          }}
          onFocus={() => {
            setFocused(true)
          }}
          autoComplete="off"
          disabled={!clientActive && !isClientModule}
        />
      </div>
      {errors.destination && (
        <span className="text-xs md:text-sm text-red-600">
          {errors.destination}
        </span>
      )}

      <div
        className="absolute z-50 top-16 w-full"
        style={{ display: `${focused ? 'block' : 'none'}` }}
      >
        <div
          ref={refSearchBox}
          className="bg-[#ECECCC] border w-full mt-1 rounded-lg"
        >
          {promiseInProgress ? (
            <div className="h-[150px] grid place-content-center">
              <ComponentLoader />
            </div>
          ) : (
            <>
              {data && data.regions.length > 0 && (
                <div className="mt-3">
                  <span className="text-sm px-4">Regiones</span>
                  <ul className="menu menu-compact">
                    {data.regions.map(
                      (region: RegionSearchMulticomplete, i: number) => (
                        <li
                          key={i}
                          onClick={() => handleSetDestination(region, 'region')}
                        >
                          <div>
                            {region.type === 'Airport' ? (
                              <i className="fa-solid fa-plane-departure text-gray-500" />
                            ) : (
                              <i className="fa-solid fa-earth-americas text-gray-500" />
                            )}

                            <span className="text-sm">
                              {region.name},{' '}
                              {region.country_code &&
                                CountryByCode(region.country_code)}
                            </span>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
              {data && data.hotels && data.hotels.length > 0 && (
                <div className="mt-2">
                  <span className="text-sm px-4">Hoteles</span>
                  <ul className="menu menu-compact">
                    {data.hotels.map(
                      (hotel: HotelSearchMulticomplete, i: number) => (
                        <li
                          key={i}
                          className="flex gap-2"
                          onClick={() => handleSetDestination(hotel, 'hotel')}
                        >
                          <div>
                            <i className="fa-solid fa-hotel text-gray-500" />
                            <span>{hotel.name}</span>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {!data && (
                <span className="block text-center text-sm p-5">
                  Sin resultados
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
