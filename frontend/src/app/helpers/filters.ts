/* eslint-disable camelcase */
import { HotelInfo } from '@api/ratehawk/interface/hotel'

const typeFilter = (data?: HotelInfo[]): Promise<HotelInfo[] | undefined> =>
  new Promise((resolve) => {
    const filterStorage = sessionStorage.getItem('checkedTypeHotelFilter')

    if (filterStorage) {
      const filter = JSON.parse(filterStorage)

      resolve(data?.filter(({ kind }) => filter.includes(kind)))
    } else {
      resolve(data)
    }
  })

const starFilter = (data?: HotelInfo[]): Promise<HotelInfo[] | undefined> =>
  new Promise((resolve) => {
    const filterStorage = sessionStorage.getItem('checkedHotelFilter')

    if (filterStorage) {
      const filterStar = JSON.parse(filterStorage)

      resolve(
        data?.filter(({ star_rating }) =>
          filterStar.includes(star_rating.toString())
        )
      )
    } else {
      resolve(data)
    }
  })

const nameFilter = (data?: HotelInfo[]): Promise<HotelInfo[] | undefined> =>
  new Promise((resolve) => {
    const filterName = sessionStorage.getItem('nameHotelFilter')

    if (filterName) {
      resolve(
        data?.filter(({ name }) =>
          name.toLocaleLowerCase().includes(filterName)
        )
      )
    } else {
      resolve(data)
    }
  })

export const ActiveRatehawkHotelFilters = async (data?: HotelInfo[]) => {
  const result = await nameFilter(data).then(starFilter).then(typeFilter)
  return result
}

export const existActiveFilters = (): boolean => {
  let res = false
  if (sessionStorage.getItem('nameHotelFilter')) {
    res = true
  }

  if (sessionStorage.getItem('priceHotelFilter')) {
    res = true
  }

  if (sessionStorage.getItem('checkedHotelFilter')) {
    res = true
  }

  if (sessionStorage.getItem('checkedTypeHotelFilter')) {
    res = true
  }

  if (sessionStorage.getItem('checkedTypeHotelFilter')) {
    res = true
  }

  return res
}
