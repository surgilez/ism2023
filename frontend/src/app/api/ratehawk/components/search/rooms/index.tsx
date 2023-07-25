/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useRef, useState } from 'react'
import { IHotelRatehawk } from '@api/ratehawk/interface/multicomplete'
import { Modal } from '@utils/components'
import { FormikErrors } from 'formik'
import { RoomsGuests } from './rooms'

interface IProps {
  values: IHotelRatehawk
  setValues: (
    values: SetStateAction<IHotelRatehawk>,
    shouldValidate?: boolean | undefined
  ) => void
  errors: FormikErrors<IHotelRatehawk>
  isClientModule?: boolean
  disabled?: boolean
}

export const Rooms = ({
  values,
  setValues,
  errors,
  disabled = false,
}: IProps) => {
  const refSearchBox = useRef<HTMLDivElement>(null)
  const { people, rooms } = values.info
  const [focused, setFocused] = useState(false)

  return (
    <div className="relative w-full" ref={refSearchBox}>
      <div className="flex flex-col ">
        <span>Habitaciones</span>
        <label onClick={() => setFocused(!disabled && true)} className="w-full">
          <input
            type="text"
            placeholder={`${rooms} ${
              rooms > 1 ? 'Habitaciones' : 'Habitación'
            } / ${people} ${people > 1 ? 'Personas' : 'Persona'}`}
            autoComplete="off"
            autoCorrect="off"
            onKeyDown={(e) => e.preventDefault()}
            className="input input-sm 2xl:input-md bg-[#ECECCC] placeholder:text-gray-600 w-full"
          />
        </label>
      </div>
      <Modal openModal={focused}>
        <RoomsGuests
          setFocused={setFocused}
          values={values}
          setValues={setValues}
          errors={errors}
        />
      </Modal>
    </div>
  )
}
