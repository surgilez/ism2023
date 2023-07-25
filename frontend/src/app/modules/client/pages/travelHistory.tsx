import { startGetHistory } from '@redux/actions/history'
import { Redux } from '@redux/interfaces/redux'
import { useEffect } from 'react'
import moment from '@helpers/moment'
import { Carousel } from 'react-responsive-carousel'
import { useDispatch, useSelector } from 'react-redux'
import { SkeletonCart } from '@utils/components/skeleton/cart'
import { usePromiseTracker } from 'react-promise-tracker'
// import { startCancelBooking } from '@redux/actions/client'
// import { useApi } from '@api/ratehawk/hooks/useApi'

export const TravelHistory = () => {
  const dispatch = useDispatch()
  const { list } = useSelector((i: Redux) => i.history)

  // const { apiRateHawk } = useApi()

  useEffect(() => {
    if (!list) {
      dispatch(startGetHistory())
    }
  }, [list])

  const { promiseInProgress } = usePromiseTracker({ area: 'getHistory' })

  // const cancelReservation = (id: string) => {
  //   if (apiRateHawk) {
  //     dispatch(startCancelBooking(id, apiRateHawk))
  //   }
  // }

  return (
    <div className="p-5 flex justify-center">
      <div className="w-full xl:w-[1200px] mt-8">
        <span className="font-medium text-xl text-white ">Historial</span>

        <div className="my-10 ">
          {promiseInProgress ? (
            <SkeletonCart />
          ) : (
            <div className="flex flex-col gap-4">
              {list && list.length > 0 ? (
                list.map((cart, i) => {
                  const {
                    img,
                    night,
                    name,
                    description,
                    service,
                    item_name,
                    subtotal,
                    iva,
                    discount,
                    total,
                    // testMode,
                    // partner,
                    checkin,
                    errorBooking,
                  } = cart

                  return (
                    cart && (
                      <div
                        key={i}
                        className="bg-grandient-primary mt-2 p-4 rounded-xl flex flex-col md:flex-row gap-4"
                      >
                        <div className="w-full md:w-[350px] lg:w-[450px]">
                          <Carousel
                            emulateTouch
                            showArrows={false}
                            showThumbs={false}
                            infiniteLoop
                            showStatus={false}
                          >
                            {img &&
                              img.map((imgData, j) => (
                                <div key={j}>
                                  <img
                                    src={imgData.replace('{size}', 'x500')}
                                    alt="hotel"
                                    className="h-[240px] object-cover rounded-xl"
                                  />
                                </div>
                              ))}
                          </Carousel>
                        </div>
                        <div className="text-gray-700 text-sm gap-4 flex flex-col md:flex-row w-full justify-between">
                          <div className="md:order-2 h-fit">
                            <div className="bg-base-200 rounded-xl p-4 flex flex-col items-end ">
                              <span className="block">
                                Precio: USD {subtotal && subtotal.toFixed(2)}
                              </span>
                              <span className="block">
                                Impuestos: USD {iva && iva.toFixed(2)}
                              </span>

                              <span className="block">
                                Ahorro x membresía: USD{' '}
                                {discount && discount.toFixed(2)}
                              </span>

                              <span className="block font-bold text-accent">
                                Total: USD {total && total.toFixed(2)}
                              </span>
                            </div>

                            {/* {testMode && (
                            <button
                              className="btn w-full btn-sm mt-4 flex gap-4"
                              onClick={() =>
                                cancelReservation(partner.partner_order_id)
                              }
                            >
                              <i className="fa-solid fa-trash-can"></i>
                              <span>Cancelar Reserva</span>
                            </button>
                          )} */}
                          </div>

                          <div className="flex flex-col md:order-1">
                            <small className="block">
                              {moment
                                .unix(Number(checkin))
                                .format('DD [de] MMMM [del] yyyy')}
                            </small>
                            {name && (
                              <span className="text-lg font-bold block">
                                Estancia {name}
                              </span>
                            )}
                            <span className="text-lg block">{item_name}</span>
                            <span className="text-md block">{description}</span>
                            <span className="text-md block">
                              {service && service.name}
                            </span>
                            <div className="mt-8 flex gap-4">
                              <span className="font-bold block">
                                {night && night === 1
                                  ? `${night} noche`
                                  : `${night} noches`}
                              </span>
                            </div>
                            <div>
                              {errorBooking && (
                                <p className="block text-sm text-red-700">
                                  {errorBooking}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )
                })
              ) : (
                <div className="grid min-h-[60vh] place-content-center">
                  <span className="text-lg block text-center text-gray-300">
                    No se encontraron artículos en tu historial de viajes
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
