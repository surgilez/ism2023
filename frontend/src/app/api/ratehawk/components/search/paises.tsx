import { IHotelRatehawk } from '@api/ratehawk/interface/multicomplete'

import { FormikErrors } from 'formik'
import { SetStateAction, useEffect, useState } from 'react'
import { Service } from '@api/redux/interface/state'
import { Client } from '@utils/interfaces'
import { Iso } from '@api/ratehawk/interface/iso'
import data from '@assets/data/ISO3166.json'
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
  disabled?: boolean
}

export const SearchPais = ({ setValues, apiRateHawk }: IProps) => {
  const inputs: Array<Iso> = [
    {
      codISO: '',
      nombrePais: '',
      codISO1: 2,
      codISO3: '',
    },
  ]
  const [paises, setPaises] = useState(inputs)
  useEffect(() => {
    setPaises(data)
  }, [])

  const handleSetCountry = (val: any) => {
    if (apiRateHawk && val) {
      setValues((arg) => {
        return { ...arg, residency: val.target.value }
      })
    }
  }

  return (
    <div className="w-full relative">
      <span className="">Nacionalidad</span>
      <div className="w-full">
        <select
          name="example"
          className="input input-sm 2xl:input-md bordered input-primary w-full bg-[#ECECCC]"
          onClick={(e) => handleSetCountry(e)}
        >
          <option value="non"> Escoga Nacionalidad</option>
          {paises.map((pais) => {
            return (
              <option key={pais.codISO1} value={pais.codISO}>
                {pais.nombrePais}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}
