import {
  PromoAdmin,
  PromoHotel,
  TFlagModal,
} from '@admin/modules/promotions/interfaces'
import { PromoAdminAction } from '@redux/interfaces/admin'
import {
  SET_LIST_PROMO,
  ACTIVE_PROMO,
  DELETE_PROMO,
  UPDATE_PROMO,
  ADD_NEW_PROMO,
  MODAL_PROMO_OPEN,
  MODAL_PROMO_INDEX,
  MODAL_PROMO_HOTEL,
} from '@redux/types'
import moment from '@helpers/moment'
import Swal from 'sweetalert2'
import { trackPromise } from 'react-promise-tracker'
import { FetchingToken } from '@helpers/fetch'
import { startChecking } from '../auth'
import { defaultError } from '@helpers/error'
import { Redux } from '../../interfaces/redux'

export const getPromos = (list?: PromoAdmin[]): PromoAdminAction => ({
  type: SET_LIST_PROMO,
  payload: { list },
})

export const addPromo = (aux: PromoAdmin): PromoAdminAction => ({
  type: ADD_NEW_PROMO,
  payload: { aux },
})

export const setPromoOpenModal = (
  open: boolean,
  flag: TFlagModal
): PromoAdminAction => ({
  type: MODAL_PROMO_OPEN,
  payload: {
    aux: {
      open,
      flag,
    },
  },
})

export const setPromoModalIndex = (aux: number): PromoAdminAction => ({
  type: MODAL_PROMO_INDEX,
  payload: {
    aux,
  },
})

export const setModalPromoHotel = (aux: PromoHotel): PromoAdminAction => ({
  type: MODAL_PROMO_HOTEL,
  payload: { aux },
})

export const activePromo = (active?: PromoAdmin): PromoAdminAction => ({
  type: ACTIVE_PROMO,
  payload: { active },
})

export const editPromo = (promo: PromoAdmin): PromoAdminAction => ({
  type: UPDATE_PROMO,
  payload: { aux: promo },
})

export const deletePromo = (): PromoAdminAction => ({
  type: DELETE_PROMO,
})

export const startAddNewPromo =
  (promo: PromoAdmin) => async (dispatch: (val?: any) => void) => {
    const { img, from, until, membership, ...rest } = promo
    delete rest.dynamic

    const fromUnix = moment(from).unix()
    const untilUnix = moment(until).unix()

    const form = new FormData()
    form.append(
      'data',
      JSON.stringify({
        ...rest,
        from: fromUnix,
        until: untilUnix,
        membershipId: membership,
      })
    )
    if (img) {
      form.append('img', img)
    }

    console.log({
      ...rest,
      from: fromUnix,
      until: untilUnix,
      membershipId: membership,
    })

    const { status, data } = await trackPromise(
      FetchingToken({
        url: `/promotion`,
        method: 'post',
        data: form,
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
      }),
      'promo_admin'
    )

    if (status === 200) {
      const promo = {
        ...data,
        membership: data.membershipId,
        from: moment.unix(data.from).format('YYYY-MM-DD'),
        until: moment.unix(data.until).format('YYYY-MM-DD'),
      }
      dispatch(addPromo(promo))
    }
  }

export const startEditPromo =
  (promo: PromoAdmin) => async (dispatch: (val?: any) => void) => {
    const { img, from, until, membership, ...rest } = promo
    delete rest.dynamic

    const fromUnix = moment(from).unix()
    const untilUnix = moment(until).unix()

    const form = new FormData()
    form.append(
      'data',
      JSON.stringify({
        ...rest,
        from: fromUnix,
        until: untilUnix,
        membershipId: membership,
      })
    )
    if (img) {
      form.append('img', img)
    }

    const { status, data } = await trackPromise(
      FetchingToken({
        url: `/promotion/${promo.id}`,
        method: 'put',
        data: form,
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
      }),
      'promo_admin'
    )

    if (status === 200) {
      const promo = {
        ...data,
        membership: data.membershipId,
        from: moment.unix(data.from).format('yyyy-MM-DD'),
        until: moment.unix(data.until).format('yyyy-MM-DD'),
      }

      dispatch(editPromo(promo))
    }
  }

export const startDeletePromo =
  (promo: PromoAdmin) => async (dispatch: (val?: any) => void) => {
    if (!moment(promo.until).isBefore(new Date())) {
      Swal.fire({
        title: 'Estas seguro de eliminar la promoción?',
        text: 'La fecha de finalización de la promoción aún no ha concluido.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si Eliminar!',
        cancelButtonText: 'Cancelar',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { from, until, membership, ...rest } = promo
          delete rest.dynamic

          const fromUnix = moment(from).unix()
          const untilUnix = moment(until).unix()

          const form = new FormData()
          form.append(
            'data',
            JSON.stringify({
              ...rest,
              from: fromUnix,
              until: untilUnix,
              membershipId: membership,
            })
          )

          const { status } = await trackPromise(
            FetchingToken({
              url: `/promotion/${promo.id}`,
              method: 'put',
              data: form,
            }).catch(({ response: { status: errStatus } }) => {
              if (errStatus === 403) {
                dispatch(startChecking())
              } else {
                defaultError()
              }
            }),
            'promo_admin'
          )

          if (status === 200) {
            dispatch(deletePromo())
            Swal.fire(
              'Eliminado!',
              'La promoción ha sido eliminada con éxito.',
              'success'
            )
          }
        }
      })
    }
  }

export const startGetPromo =
  () => async (dispatch: (val?: any) => void, redux: () => Redux) => {
    const { rol } = redux().user

    const { status, data } = await trackPromise(
      FetchingToken({
        url: `/promotions/${rol}`,
        method: 'get',
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
      }),
      'promo_admin'
    )

    if (status === 200 && data) {
      const promos = data.map((item: any) => ({
        ...item,
        from: moment.unix(item.from).format('yyyy-MM-DD'),
        until: moment.unix(item.until).format('yyyy-MM-DD'),
        membership: item.membershipId,
      }))

      dispatch(getPromos(promos as any))
    }
  }
