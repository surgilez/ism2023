import { defaultError } from '@helpers/error'
import { Fetching, FetchingToken } from '@helpers/fetch'
import {
  CustomErrCreateBooking,
  ErrorCreateBooking,
  FinishBooking,
  IPayment,
  NewBookingData,
  NewBookingFetch,
  PaymentType,
  TStatePayment,
} from '@client/interface/payment'
import {
  SET_CHECKOUT_ID,
  SET_PAYMENT_STATE,
  PARTNER_ORDER_ID,
} from '@redux/types'
import { startChecking } from '../auth'
import { trackPromise } from 'react-promise-tracker'
import { PaymentAction } from '@redux/interfaces/client'
import Swal from 'sweetalert2'
import { Redux } from '@redux/interfaces/redux'
import { publicIpv4 } from 'public-ip'
import { v4 as uuidv4 } from 'uuid'
import {
  deleteItemShoppingVal,
  setShoppingOrderID,
  startDeleteAllItemsWithoutConfirm,
} from '../shopping'
import { ShoppingAction } from '@redux/interfaces/shopping'
import { verifyPaymentMethod } from '@helpers/payment'
import { Service } from '@api/redux/interface'
import moment from 'moment'

export const setCheckOutIDAction = (
  checkoutId: string | undefined
): PaymentAction => ({
  type: SET_CHECKOUT_ID,
  payload: { checkoutId },
})

export const setPaymentStateAction = (
  state?: TStatePayment
): PaymentAction => ({
  type: SET_PAYMENT_STATE,
  payload: { state },
})

export const AddNewOrderID = (aux: NewBookingData): PaymentAction => ({
  type: PARTNER_ORDER_ID,
  payload: {
    aux,
  },
})

export const startVerifyBook =
  (val: IPayment) =>
  async (
    dispatch: (val?: PaymentAction | ShoppingAction | any) => void,
    redux: () => Redux
  ) => {
    const {
      shopping: { shopping },
      api: {
        services: { list: listServiceApi },
      },
    } = redux()

    if (val.amount === 0) {
      return Swal.fire({
        title: 'No se puede procesar la solicitud',
        text: 'El monto cargado a tu factura es de $ 0.00',
        icon: 'error',
      })
    }

    dispatch(setPaymentStateAction('checkout'))

    const apiService = listServiceApi.find(
      ({ name, api }) =>
        name === 'Hoteles' &&
        api?.name.toLocaleLowerCase() === 'Ratehawk'.toLowerCase()
    )

    localStorage.setItem('apiService', JSON.stringify(apiService))

    const error: CustomErrCreateBooking = {
      hashError: false,
      err: [],
    }

    const shoppingApproved: PaymentType[] = []

    if (shopping && shopping.length > 0) {
      for (let i = 0; i < shopping.length; i++) {
        if (
          apiService &&
          shopping[i].service.name === 'Hoteles' &&
          shopping[i].service.api.toLocaleLowerCase() ===
            'Ratehawk'.toLocaleLowerCase()
        ) {
          const booking = await createNewBooking(
            String(shopping[i].book_hash),
            apiService,
            ({ err, msg }: CustomErrCreateBooking) => {
              console.log({
                title: `Error al crear la reserva en la habitación ${shopping[i].name}
                  en el hotel ${shopping[i].item_name}`,
                description: msg,
                code: err,
              })

              error.hashError = true
              ;(error.err as ErrorCreateBooking[]).push(
                err as ErrorCreateBooking
              )

              dispatch(deleteItemShoppingVal(shopping[i]))
            }
          ).then((data) => data?.data.data)

          if (booking && booking.data) {
            const paymentType = await verifyPaymentMethod(
              booking.data as NewBookingData
            )

            if (!paymentType) {
              dispatch(setPaymentStateAction('error'))
              return Swal.fire({
                title: 'No se puede procesar la solicitud',
                text: 'No se pudo verificar el método de pago en el proveedor del servicio',
                icon: 'error',
              })
            } else {
              shoppingApproved.push(paymentType)

              const order = {
                ...booking.data,
                testMode: shopping[i].testMode,
              }

              // console.log('id de orden aprobado ', order.partner_order_id)

              dispatch(setShoppingOrderID({ ...shopping[i], order }))

              dispatch(AddNewOrderID(order))
            }
          }
        }
      }
    }

    if (shoppingApproved.length > 0) {
      localStorage.setItem('paymentType', JSON.stringify(shoppingApproved))
      dispatch(startProcessPayment(val))
    }

    if (error.hashError) {
      dispatch(setPaymentStateAction('error'))
      Swal.fire({
        title: 'No se puede procesar tu solicitud de reserva',
        text: `Algunos de las habitaciones no se encuentran disponibles para realizar la reserva,
          por tal motivo se procedió a eliminarlas de tu carrito, agrega nuevamente las habitaciones que desees reservar.
          Si el problema persiste contacta al administrador del sistema con el código de error "${error.err}"`,
        icon: 'error',
      })
    }
  }

export const startProcessPayment =
  (val: IPayment) => async (dispatch: (val?: any) => void) => {
    const { extra, ...rest } = val

    localStorage.setItem('formPayment', JSON.stringify({ ...extra }))

    dispatch(setPaymentStateAction('processing'))

    const {
      status,
      data: { data },
    } = await trackPromise(
      FetchingToken({
        url: '/payment',
        method: 'post',
        data: { ...rest },
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
        dispatch(setPaymentStateAction('error'))
      }),
      'processPayment'
    )
    console.log('pago', data, val)
    if (
      status === 200 &&
      (data.result.code === '000.200.100' || data.result.code === '000.100.112')
    ) {
      dispatch(setCheckOutIDAction(data.id))
    } else {
      dispatch(setPaymentStateAction('error'))
      Swal.fire({
        title: 'Error al procesar el pago',
        text: data.result.description,
        icon: 'error',
      })
    }
  }

export const checkoutStatusPayment =
  () => async (dispatch: (val?: any) => void, redux: () => Redux) => {
    const {
      client: {
        payment: { checkoutId, partnerOrder },
      },
      shopping: { shopping },
      auth: { uid },
    } = redux()
    dispatch(setPaymentStateAction('checkout'))

    const {
      status,
      data: { data },
    } = await trackPromise(
      FetchingToken({
        url: `/payment/${checkoutId}`,
        method: 'get',
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
        dispatch(setPaymentStateAction('error'))
      }),
      'statePayment'
    )

    const isPaymentOk =
      process.env.PAYMENT_TEST === 'OK'
        ? data.result.code === '000.100.112'
          ? true
          : false
        : data.result.code === '000.000.000'
        ? true
        : false

    if (status === 200 && isPaymentOk) {
      // guardar los datos del pago en la base de datos

      const paymentTypeStorage = localStorage.getItem('paymentType')
      const apiServiceStorage = localStorage.getItem('apiService')
      const formPaymentStorage = localStorage.getItem('formPayment')

      let paymentType: PaymentType[] | null = null
      let apiService: Service | null = null
      let formPayment: any | null = null

      if (!paymentTypeStorage || !formPaymentStorage || !apiServiceStorage) {
        return Swal.fire({
          title: 'Error al finalizar la reserva',
          text: 'No se pudo obtener el tipo de pago o el servicio, contáctese con el administrador para suspender el pago',
          icon: 'error',
        })
      }

      paymentType = JSON.parse(paymentTypeStorage) as PaymentType[]
      apiService = JSON.parse(apiServiceStorage)
      formPayment = JSON.parse(formPaymentStorage)

      const { language, rooms, user, phone, voucher } = formPayment
      voucher.email = 'jowell29jm@gmail.com'
      voucher.confirmEmail = 'jowell29jm@gmail.com'
      const dataBooking: FinishBooking = {
        ...formPayment,
        language,
        rooms,
        user: {
          ...user,
          phone: phone[0].number,
          email: voucher.email,
        },
      }

      const statusAllBooking: NewBookingData[] = []
      //console.log('partnerOrder', partnerOrder)
      if (partnerOrder) {
        for (let i = 0; i < partnerOrder.length; i++) {
          const statusBook = await finishBooking(
            {
              ...dataBooking,
              partner: {
                partner_order_id: partnerOrder[i].partner_order_id,
                amount_sell_b2b2c: '1',
                comment: 'partner comment',
              },
              payment_type: paymentType[i],
            },
            apiService as Service
          )
          if (!statusBook) {
            statusAllBooking.push(partnerOrder[i])
          }
        }
      }

      const shoppingCart = shopping ? [...shopping] : []

      if (statusAllBooking.length > 0) {
        let result = ''
        statusAllBooking.forEach(({ partner_order_id }) => {
          result += `${partner_order_id} \n`

          shopping?.forEach(({ order }: any, index) => {
            if (order.partner_order_id === partner_order_id) {
              shoppingCart[index] = {
                ...shoppingCart[index],
                errorBooking: `error en la reserva ${
                  shoppingCart[index].service.api
                }, 
                N.orden = ${partner_order_id}, 
                fecha de reservación = ${moment().format('DD/MM/YYYY')}`,
              }
            }
          })
        })

        dispatch(setPaymentStateAction('error'))

        Swal.fire({
          title: 'Error al finalizar una o varias reservas',
          text: `Contacta a un asesor con los siguientes id de reservas (partnerOrderID): ${result} /`,
          icon: 'error',
        })
      } else {
        dispatch(setPaymentStateAction('success'))
        dispatch(setCheckOutIDAction(''))
        localStorage.removeItem('util')

        Swal.fire({
          title: 'Reserva realizada con éxito',
          text: 'La reserva se ha realizado con éxito, en breve recibirá un correo con los datos de tu voucher',
          icon: 'success',
        })
      }

      let form = localStorage.getItem('formPayment')

      if (form) {
        form = JSON.parse(form)
      }

      const saveDB = {
        accountId: uid,
        form,
        shopping: shoppingCart,
      }

      dispatch(startSaveBookingDB(saveDB))

      localStorage.removeItem('formPayment')
      localStorage.removeItem('apiService')
      localStorage.removeItem('paymentType')
      localStorage.removeItem('checkoutId')

      dispatch(startDeleteAllItemsWithoutConfirm())
    } else {
      dispatch(setPaymentStateAction('error'))
      Swal.fire({
        title: 'Error al procesar el pago',
        text: data.result.description,
        icon: 'error',
      })
    }
  }

export const createNewBooking = async (
  book_hash: string,
  apiService: Service,
  callbackError?: (err: CustomErrCreateBooking) => void
): Promise<NewBookingFetch | undefined> => {
  const data = {
    partner_order_id: uuidv4(),
    book_hash,
    language: 'es',
    user_ip: await publicIpv4(),
  }

  const auth = {
    username: apiService?.api?.credentials.username || '',
    password: apiService?.api?.credentials.password || '',
  }

  // console.log(`${apiService.api?.endPoint}/hotel/order/booking/form/`)
  // console.log(data)
  return await Fetching({
    url: '/api-query',
    method: 'post',
    data,
    headers: {
      'x-path': `${apiService.api?.endPoint}/hotel/order/booking/form/`,
      'x-auth': JSON.stringify(auth),
    },
  }).catch(({ err }: { err: ErrorCreateBooking }) => {
    let msg = ''
    switch (err) {
      case 'timeout':
        msg = 'El sistema está experimentando problemas técnicos temporales'
        break
      case 'contract_mismatch':
        msg = 'El contrato no corresponde a la habitación seleccionada'
        break
      case 'double_booking_form':
        msg = 'La reserva ya se encuentra confirmada'
        break
      case 'duplicate_reservation':
        msg = 'La reserva ya se encuentra confirmada'
        break
      case 'hotel_not_found':
        msg = 'El hotel no se encuentra en nuestros registros'
        break
      case 'insufficient_b2b_balance':
        msg = 'Límite de crédito excedido para el proveedor del servicio'
        break
      case 'reservation_is_not_allowed':
        msg = 'La reserva no está permitida para el proveedor del servicio'
        break
      case 'rate_not_found':
        msg = 'Habitación no encontrada'
        break
      case 'unknown':
        msg = 'Error desconocido'
        break
      case 'sandbox_restriction':
        msg = 'La reserva no está permitida para el modo de prueba'
        break
      default:
        msg = 'Error al crear la reserva'
    }
    msg += ' por tal motivo se ha eliminado la habitación del carrito'

    callbackError &&
      callbackError({ err: err || 'unspecified_error_booking', msg })
  })
}

export const finishBooking = async (
  booking: FinishBooking,
  apiService: Service
): Promise<boolean> => {
  return new Promise(async (resolve) => {
    const { user, partner, language, rooms, payment_type } = booking

    const auth = {
      username: apiService?.api?.credentials.username || '',
      password: apiService?.api?.credentials.password || '',
    }

    // booking.payment_type
    //   ? (booking.payment_type.amount = '7')
    //   : console.log('NA')

    const { status, data } = await Fetching({
      url: '/api-query',
      method: 'post',
      data: { user, partner, language, rooms, payment_type },
      headers: {
        'x-path': `${apiService?.api?.endPoint}/hotel/order/booking/finish/`,
        'x-auth': JSON.stringify(auth),
      },
    })

    if (status === 200 && data.data.status === 'ok') {
      bookingFinishStatus(booking, apiService)
    }
    const resultStatus = status === 200 && data.data.status === 'ok'
    resolve(resultStatus)
  })
}

const bookingFinishStatus = (booking: FinishBooking, apiService: Service) => {
  const intervalo = setInterval(async () => {
    const { partner } = booking
    const { partner_order_id } = partner
    const auth = {
      username: apiService?.api?.credentials.username || '',
      password: apiService?.api?.credentials.password || '',
    }

    console.log(booking)
    const { status, data } = await Fetching({
      url: '/api-query',
      method: 'post',
      data: { partner_order_id },
      headers: {
        'x-path': `${apiService?.api?.endPoint}/hotel/order/booking/finish/status/`,
        'x-auth': JSON.stringify(auth),
      },
    })
    Swal.fire(
      'En proceso de reserva!',
      'Por favor no cierre esta pagina',
      'warning'
    )

    if (data.data.status === 'ok') {
      console.log('Termino el proceso de reserva booking finish status')
      Swal.fire(
        'Reserva exitosa!',
        'El proceso de reserva a sido exitosa',
        'success'
      )
      clearInterval(intervalo)
    }
  }, 3000)
  intervalo
}

export const startCancelBooking =
  (orderPartnerID: string, apiService: Service) => async () => {
    const auth = {
      username: apiService?.api?.credentials.username || '',
      password: apiService?.api?.credentials.password || '',
    }

    const { status, data } = await Fetching({
      url: '/api-query',
      method: 'post',
      data: { partner_order_id: orderPartnerID },
      headers: {
        'x-path': `${apiService?.api?.endPoint}/hotel/order/cancel/`,
        'x-auth': JSON.stringify(auth),
      },
    }).catch((err) => {
      console.error(err)
    })

    if (status === 200 && data.data.status === 'ok') {
      Swal.fire(
        'Proceso completado!',
        'La reserva ha sido cancelada con éxito',
        'success'
      )
    }
  }

export const startSaveBookingDB =
  (saveDB: any) => async (dispatch: (val?: any) => void) => {
    await trackPromise(
      FetchingToken({
        url: '/sales-history',
        method: 'post',
        data: saveDB,
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
      }),
      'saveBookingDB'
    )
  }
