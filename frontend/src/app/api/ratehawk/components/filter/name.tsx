import { setFilterHotel } from '@api/ratehawk/redux/actions/region'
import {
  ActiveRatehawkHotelFilters,
  existActiveFilters,
} from '@helpers/filters'
import { Redux } from '@redux/interfaces/redux'
import { useDebounce } from '@utils/hooks/useDebounce'
import { KeyboardEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface IProps {
  isClientModule?: boolean
}

export const FilterName = ({ isClientModule = true }: IProps) => {
  const dispatch = useDispatch()
  const { hotel, filter } = useSelector((i: Redux) => i.api.ratehawk.region)
  const { handleSetTimeOut } = useDebounce()

  const handleKeyPress = (ev: KeyboardEvent<HTMLInputElement>) => {
    const { value } = ev.target as HTMLInputElement
    if (value) {
      sessionStorage.setItem('nameHotelFilter', value.toLocaleLowerCase())
    } else {
      sessionStorage.removeItem('nameHotelFilter')
    }

    let result = null
    const activeFilters = existActiveFilters()

    handleSetTimeOut(async () => {
      if (activeFilters) {
        result = await ActiveRatehawkHotelFilters(hotel)
      } else if (filter?.length === hotel?.length) {
        result = hotel?.filter(({ name }) =>
          name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        )
      } else if (!activeFilters) {
        result = hotel
      } else {
        result = filter?.filter(({ name }) =>
          name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        )
      }

      if (result) {
        dispatch(setFilterHotel(result))
      }
    }, 300)
  }

  return (
    <li className="collapse bg-transparent border-b-2 border-[#003C6B]">
      <input type="checkbox" className="!min-h-0" />
      <div className="collapse-title text-md flex justify-between p-0">
        <span className="text-sm">Nombre</span>
        <i
          className={`fa-solid fa-caret-down  ${
            isClientModule ? 'text-primary' : 'text-secondary'
          }`}
        />
      </div>
      <div className="collapse-content">
        <div className="pt-3">
          <input
            type="text"
            placeholder="Nombre del hotel"
            onKeyUp={handleKeyPress}
            autoComplete="off"
            className={`"w-full input input-sm bg-transparent 
              shadow-none border border-[#002440]  ${
                isClientModule
                  ? 'placeholder:text-gray-300'
                  : 'placeholder:text-gray-600'
              }`}
          />
        </div>
      </div>
    </li>
  )
}
