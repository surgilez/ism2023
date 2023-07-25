import { THotel } from '@api/ratehawk/interface/utils'
import { setFilterHotel } from '@api/ratehawk/redux/actions/region'
import {
  ActiveRatehawkHotelFilters,
  existActiveFilters,
} from '@helpers/filters'
import { Redux } from '@redux/interfaces/redux'
import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface IProps {
  isClientModule?: boolean
}

export const TypeHotel = ({ isClientModule = true }: IProps) => {
  const checkList: THotel[] = [
    'Apart-hotel',
    'Apartment',
    'BNB',
    'Hotel',
    'Hostel',
    'Boutique_and_Design',
    'Camping',
    'Castle',
    'Cottages_and_Houses',
    'Farm',
    'Guesthouse',
    'Mini-hotel',
  ]
  const [checked, setChecked] = useState<string[]>([])
  const dispatch = useDispatch()
  const { filter, hotel } = useSelector((i: Redux) => i.api.ratehawk.region)

  const handleCheck = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    let updatedList = [...checked]
    if (target.checked) {
      updatedList = [...checked, target.value]
    } else {
      updatedList.splice(checked.indexOf(target.value), 1)
    }
    setChecked(updatedList)

    let res = null
    if (updatedList.length > 0) {
      sessionStorage.setItem(
        'checkedTypeHotelFilter',
        JSON.stringify(updatedList)
      )
    } else {
      sessionStorage.removeItem('checkedTypeHotelFilter')
    }

    const activeFilters = existActiveFilters()

    if (activeFilters) {
      res = await ActiveRatehawkHotelFilters(hotel)
    } else if (filter?.length === hotel?.length) {
      res = hotel?.filter(({ kind }) => updatedList.includes(kind))
    } else if (!activeFilters) {
      res = hotel
    } else {
      res = filter?.filter(({ kind }) => updatedList.includes(kind))
    }

    if (res) {
      dispatch(setFilterHotel(res))
    }
  }

  return (
    <li className="collapse bg-transparent border-b-2 border-[#003C6B]">
      <input type="checkbox" className="!min-h-0" />
      <div className="collapse-title text-md flex justify-between p-0">
        <span className="text-sm">Tipo de alojamiento</span>
        <i
          className={`fa-solid fa-caret-down  ${
            isClientModule ? 'text-primary' : 'text-secondary'
          }`}
        />
      </div>
      <div className="collapse-content">
        <div className="pt-3">
          {checkList.map((item, index) => (
            <div key={index} className="flex gap-3 items-center">
              <input
                value={item}
                type="checkbox"
                onChange={handleCheck}
                className={`checkbox checkbox-sm mt-1 ${
                  isClientModule ? 'checkbox-primary' : 'checkbox-secondary'
                }`}
              />
              <span
                className={`text-sm ${
                  isClientModule ? 'text-primary' : 'text-secondary'
                }`}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </li>
  )
}
