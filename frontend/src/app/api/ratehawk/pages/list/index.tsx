import { setFilterHotel } from '@api/ratehawk/redux/actions/region'
import { Redux } from '@redux/interfaces/redux'
import { useEffect } from 'react'
import { usePromiseTracker } from 'react-promise-tracker'
import { useDispatch, useSelector } from 'react-redux'
import { HotelFilter } from '../../components/filter'
import { HotelListCard } from './card'

interface IProps {
  isClientModule?: boolean
  isPromo?: boolean
}

export const HotelListRatehawkPage = ({
  isClientModule = true,
  isPromo = false,
}: IProps) => {
  const dispatch = useDispatch()
  const { data, filter, hotel } = useSelector(
    (i: Redux) => i.api.ratehawk.region
  )

  const { promiseInProgress } = usePromiseTracker({ area: 'regionSearch' })

  useEffect(() => {
    if (hotel && filter && hotel.length !== filter.length) {
      dispatch(setFilterHotel(hotel))
    }
  }, [dispatch])

  return (
    <>
      <div className="mb-3 flex justify-between items-center">
        <div>
          <span className="block text-3xl text-[#003C6B] font-bold">
            Hoteles
          </span>
          {promiseInProgress ? (
            <div className="skeleton-box w-[100px] p-2 rounded-lg" />
          ) : (
            filter &&
            filter?.length > 0 && (
              <span className="block">
                {filter.length} {`${filter.length === 1 ? 'hotel' : 'hoteles'}`}
              </span>
            )
          )}
        </div>
        <div className="dropdown dropdown-end relative">
          <label tabIndex={0} className="m-1">
            <i
              className={`fa-solid fa-filter text-xl pr-2 cursor-pointer text-[#003C6B] ${
                isClientModule && 'md:hidden'
              }`}
            />
          </label>
          <div
            tabIndex={0}
            className={`dropdown-content shadow rounded-box ${
              isClientModule ? 'bg-grandient-secondary' : 'bg-gradient-primary'
            }`}
          >
            {data?.hotels && !promiseInProgress && (
              <HotelFilter isClientModule={isClientModule} />
            )}
          </div>
        </div>
      </div>
      <div
        className={`flex gap-4 rounded-xl p-4 ${
          isClientModule && ' bg-grandient-secondary'
        }`}
      >
        {data?.hotels && !promiseInProgress && (
          <div
            className={`shadow-xl rounded-xl h-fit hidden ${
              isClientModule && 'md:block'
            }`}
          >
            <HotelFilter isClientModule={isClientModule} />
          </div>
        )}
        <div className="overflow-auto data-scroll w-full">
          {promiseInProgress ? (
            <div className="w-full gap-8 flex flex-col md:flex-row justify-around items-center my-5">
              {new Array(isClientModule ? 4 : 3).fill({}).map((_, i) => (
                <div
                  key={i}
                  className="w-full  flex flex-col gap-3 bg-base-100 p-3 rounded-xl"
                >
                  <div className="skeleton-box !h-[200px] rounded-md" />
                  <div className="skeleton-box !h-[15px] w-[80%] rounded-md" />
                  <div className="skeleton-box !h-[15px] w-[20%] rounded-md" />
                  <div className="skeleton-box !h-[15px] w-[50%] rounded-md" />
                  <div className="skeleton-box !h-[100px] rounded-md" />
                  <div className="skeleton-box !h-[20px] rounded-md" />
                </div>
              ))}
            </div>
          ) : (
            <div>
              {data?.hotels ? (
                <HotelListCard
                  isClientModule={isClientModule}
                  isPromo={isPromo}
                />
              ) : (
                <div className="w-full min-h-[45vh] grid place-content-center">
                  <div className="max-w-[300px]">
                    <span
                      className={`text-center block ${
                        isClientModule && 'text-white'
                      }`}
                    >
                      No existen hoteles que coincidan con el criterio de
                      búsqueda
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
