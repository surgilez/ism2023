import { ChangeEvent, useState } from 'react'
import { RatingComponent } from '@utils/components/rating.jsx'
import { Redux } from '@redux/interfaces/redux'
import { setFilterHotel } from '@api/ratehawk/redux/actions/region'
import { TRating } from '@api/ratehawk/interface/utils'
import { useDispatch, useSelector } from 'react-redux'
/* eslint-disable camelcase */
import {
  ActiveRatehawkHotelFilters,
  existActiveFilters,
} from '@helpers/filters'

interface IProps {
  isClientModule?: boolean
}

export const StartFilter = ({ isClientModule = true }: IProps) => {
  const checkList: TRating[] = [5, 4, 3, 2, 1, 0]
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
      sessionStorage.setItem('checkedHotelFilter', JSON.stringify(updatedList))
    } else {
      sessionStorage.removeItem('checkedHotelFilter')
    }

    const activeFilters = existActiveFilters()

    if (activeFilters) {
      res = await ActiveRatehawkHotelFilters(hotel)
    } else if (filter?.length === hotel?.length) {
      res = hotel?.filter(({ star_rating }) =>
        updatedList.includes(star_rating.toString())
      )
    } else if (!activeFilters) {
      res = hotel
    } else {
      res = filter?.filter(({ star_rating }) =>
        updatedList.includes(star_rating.toString())
      )
    }

    if (res) {
      dispatch(setFilterHotel(res))
    }
  }

  return (
    <li className="collapse bg-transparent border-b-2 border-[#003C6B]">
      <input type="checkbox" className="!min-h-0" />
      <div className="collapse-title text-md flex justify-between p-0">
        <span className="text-sm">Clasificación</span>
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

              {item === 0 ? (
                <span
                  className={`"text-sm  ${
                    isClientModule ? 'text-primary' : 'text-secondary'
                  }`}
                >
                  Sin estrellas
                </span>
              ) : (
                <RatingComponent
                  initialRating={item}
                  readonly
                  emptySymbol={
                    <i className="fa-regular fa-star text-transparent" />
                  }
                  fullSymbol={
                    <i
                      className={`fa-solid fa-star  ${
                        isClientModule ? 'text-primary' : 'text-secondary'
                      }`}
                    />
                  }
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </li>
  )
}
