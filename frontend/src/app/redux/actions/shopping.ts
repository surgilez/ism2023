import Swal from 'sweetalert2'
import { IBill, ShoppingCart } from '@modules/shopping/interface'
import { Redux } from '@redux/interfaces/redux'
import { ShoppingAction } from '@redux/interfaces/shopping'
import {
  GET_SHOPPING,
  ADD_NEW_ITEM,
  DELETE_ITEM,
  DELETE_ALL_ITEMS,
  GET_BILL,
  ADD_NIGHT,
  SET_TOTAL,
  DELETE_VAL_ITEM,
  CART_ORDER_ID,
} from '../types'
import { trackPromise } from 'react-promise-tracker'
import { FetchingToken } from '@helpers/fetch'
import { logout } from './auth'

export const getShopping = (shopping: ShoppingCart[]): ShoppingAction => ({
  type: GET_SHOPPING,
  payload: {
    shopping,
  },
})

export const setShoppingOrderID = (partner: any): ShoppingAction => ({
  type: CART_ORDER_ID,
  payload: {
    aux: partner,
  },
})

export const setTotalShoppingAction = (aux: number): ShoppingAction => ({
  type: SET_TOTAL,
  payload: {
    aux,
  },
})

export const addNewItemShopping = (Car: ShoppingCart): ShoppingAction => ({
  type: ADD_NEW_ITEM,
  payload: {
    aux: Car,
  },
})

export const addNightAction = (aux: ShoppingCart): ShoppingAction => ({
  type: ADD_NIGHT,
  payload: {
    aux,
  },
})

export const deleteItemShoppingVal = (aux: ShoppingCart): ShoppingAction => ({
  type: DELETE_VAL_ITEM,
  payload: {
    aux,
  },
})

export const deleteItemShopping = (
  Car: ShoppingCart[],
  total: number
): ShoppingAction => ({
  type: DELETE_ITEM,
  payload: {
    aux: {
      Car,
      total,
    },
  },
})

export const deleteAllItemShopping = (): ShoppingAction => ({
  type: DELETE_ALL_ITEMS,
})

export const getBillShopping = (bill?: IBill): ShoppingAction => ({
  type: GET_BILL,
  payload: {
    bill,
  },
})

export const startDeleteItemShopping =
  (item: ShoppingCart, uid: string) =>
  async (dispatch: (val?: ShoppingAction) => void, redux: () => Redux) => {
    Swal.fire({
      title: `Estas seguro de eliminar ${item.name}  del carrito?`,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const {
          shopping: { shopping, bill },
        } = redux()

        const shoppingAux = shopping?.filter(({ id }) => id !== item.id)

        if (shoppingAux && shoppingAux.length === 0) {
          await FetchingToken({
            method: 'delete',
            url: `/cart/${String(bill?.id)}`,
          })
        } else {
          await FetchingToken({
            method: 'put',
            url: `/cart/${String(bill?.id)}`,
            data: {
              accountId: uid,
              shopping: shoppingAux || [],
            },
          })
        }

        dispatch(deleteItemShopping(shoppingAux || [], item.total))

        Swal.fire(
          'Operación completada',
          `Se elimino correctamente el producto`,
          'success'
        )
      }
    })
  }

export const startAddNewItemShopping =
  (item: ShoppingCart, uid: string) =>
  async (dispatch: (val?: any) => void, redux: () => Redux) => {
    const { shopping, bill } = redux().shopping

    if (!bill) {
      const {
        status,
        data: { id },
      } = await trackPromise(
        FetchingToken({
          method: 'post',
          url: `/cart`,
          data: {
            accountId: uid,
            shopping: [item],
          },
        }).catch(({ response: { status: errStatus } }) => {
          if (errStatus === 403) {
            dispatch(logout())
            Swal.fire(
              'La sesión activa ha vencido',
              'Por motivos de seguridad es necesario que vuelvas a iniciar la sesión',
              'warning'
            )
          } else {
            Swal.fire(
              'Error creando el carrito',
              'Por favor intenta de nuevo',
              'warning'
            )
          }
        }),
        'shoppingCart'
      )

      if (status === 200 && id) {
        dispatch(addNewItemShopping(item))
        dispatch(getBillShopping({ id }))
      }
    } else {
      const existInCart = shopping?.find(({ id }) => id === item.id)
      if (existInCart) {
        return Swal.fire(
          'Solicitud no procesada',
          'El articulo ya se encuentra agregado en el carrito',
          'info'
        )
      }
      const { status } = await trackPromise(
        FetchingToken({
          method: 'put',
          url: `/cart/${bill.id}`,
          data: {
            accountId: uid,
            shopping: [...(shopping || []), item],
          },
        }).catch(({ response: { status: errStatus } }) => {
          if (errStatus !== 403) {
            Swal.fire(
              'Error actualizando el carrito',
              'Por favor intenta de nuevo',
              'warning'
            )
          }
        }),
        'shoppingCart'
      )

      if (status === 200) {
        dispatch(addNewItemShopping(item))
      }
    }

    Swal.fire(
      'Solicitud completa',
      'El articulo se agrego correctamente en el carrito',
      'success'
    )
  }

export const startDeleteItemShoppingDB = (id: string): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    const { status, data } = await FetchingToken({
      method: 'delete',
      url: `/cart/${id}`,
    }).catch((err) => reject(err))

    if (status === 200 && data.id) {
      resolve(true)
    } else {
      resolve(false)
    }
  })
}

export const startDeleteAllItemsWithoutConfirm =
  () =>
  async (dispatch: (val?: ShoppingAction) => void, redux: () => Redux) => {
    const { bill } = redux().shopping

    if (bill?.id) {
      await startDeleteItemShoppingDB(String(bill.id))
    }

    dispatch(deleteAllItemShopping())
  }

export const startDeleteAllItemsShopping =
  (showMsg = true) =>
  async (dispatch: (val?: ShoppingAction) => void, redux: () => Redux) => {
    Swal.fire({
      title: 'Estas seguro de eliminar todos los items del carrito?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { bill } = redux().shopping

        if (bill?.id) {
          await startDeleteItemShoppingDB(String(bill.id))
        }

        dispatch(deleteAllItemShopping())

        showMsg &&
          Swal.fire(
            'Operación completada',
            'El carrito ha sido vaciado completamente',
            'success'
          )
      }
    })
  }

export const startGetShopping =
  (uid: string) => async (dispatch: (val?: any) => void) => {
    const { status, data } = await trackPromise(
      FetchingToken(
        {
          method: 'get',
          url: `/cart/${uid}`,
        },
        () => {
          dispatch(logout())
        }
      ),
      'shoppingCart'
    )

    if (status === 200 && data) {
      data.shopping && dispatch(getShopping(data.shopping))
      data.id && dispatch(getBillShopping({ id: data.id }))
    } else {
      dispatch(getShopping([]))
      dispatch(getBillShopping(undefined))
    }
  }
