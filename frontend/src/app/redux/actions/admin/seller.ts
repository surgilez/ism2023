/* eslint-disable @typescript-eslint/no-explicit-any */
import { Redux } from '@redux/interfaces/redux'
import { trackPromise } from 'react-promise-tracker'
import { FetchingToken } from '@helpers/fetch'
import { Seller } from '@admin/modules/sellers/interfaces'
import { SellerAction } from '@redux/interfaces/admin'
import {
  ADD_NEW_SELLER,
  ACTIVE_SELLER,
  EDIT_SELLER,
  SUSPENSE_SELLER,
  GET_SELLERS,
  SET_TOTAL_REGISTROS_SELLER,
  GET_ALL_SELLERS,
} from '@redux/types'
import { defaultError } from '@helpers/error'
import { startChecking } from '../auth'
import { setPageAction } from './utils'

export const getSellers = (list: {
  accounts: Seller[]
  totalResults: number
}): SellerAction => ({
  type: GET_SELLERS,
  payload: { list },
})

export const addSeller = (aux: Seller): SellerAction => ({
  type: ADD_NEW_SELLER,
  payload: { aux },
})

export const setTotalRegistrosSeller = (aux: number): SellerAction => ({
  type: SET_TOTAL_REGISTROS_SELLER,
  payload: { aux },
})

export const getAllSellersAction = (aux: Seller[]): SellerAction => ({
  type: GET_ALL_SELLERS,
  payload: {
    aux,
  },
})

export const activeSeller = (active?: Seller): SellerAction => ({
  type: ACTIVE_SELLER,
  payload: { active },
})

export const editSeller = (membership: Seller): SellerAction => ({
  type: EDIT_SELLER,
  payload: { aux: membership },
})

export const suspenseSeller = (aux: Seller): SellerAction => ({
  type: SUSPENSE_SELLER,
  payload: {
    aux,
  },
})

export const startAddNewSeller =
  (seller: Seller) =>
  async (dispatch: (val?: SellerAction | any) => void, redux: () => Redux) => {
    const {
      auth: { roles },
      admin,
      utils: { page: currentPage },
    } = redux()
    const sellerRole = roles?.find((rol) => rol.name === 'seller')

    const dataFetch = {
      email: seller.email,
      roleId: sellerRole?.id,
      person: {
        name: seller.name,
        lastName: seller.lastName,
        address: seller.address,
        phone: seller.phone,
        doc: seller.doc,
        typeSeller: seller.seller,
        commission: Number(seller.dsto),
        allowAdviser: seller.allowAdviser,
        allowChat: seller.allowChat,
      },
    }

    const data = new FormData()

    data.append('person', JSON.stringify(dataFetch.person))
    data.append('email', dataFetch.email)
    data.append('roleId', dataFetch?.roleId || '')

    if (seller.img) {
      data.append('img', seller.img)
    }

    const {
      status,
      data: { id },
    } = await trackPromise(
      FetchingToken({
        url: '/account',
        method: 'post',
        data,
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
      }),
      'sellers_admin'
    )

    if (status === 200) {
      dispatch(
        setTotalRegistrosSeller((admin.seller.list?.totalResults || 0) + 1)
      )
      const sellersTotal = (admin.seller.list?.accounts.length || 0) + 1

      if (sellersTotal <= 5) {
        dispatch(addSeller({ ...seller, id }))
      } else {
        dispatch(setPageAction((currentPage || 1) + 1))
      }
    }
  }

export const startEditSeller =
  (seller: Seller) =>
  async (dispatch: (val?: SellerAction | any) => void, redux: () => Redux) => {
    const { roles } = redux().auth
    const sellerRole = roles?.find((rol) => rol.name === 'seller')

    const dataFetch = {
      email: seller.email,
      roleId: sellerRole?.id,
      person: {
        name: seller.name,
        lastName: seller.lastName,
        address: seller.address,
        phone: seller.phone,
        doc: seller.doc,
        typeSeller: seller.seller,
        commission: Number(seller.dsto),
        allowAdviser: seller.allowAdviser,
        allowChat: seller.allowChat,
      },
    }

    const data = new FormData()

    data.append('person', JSON.stringify(dataFetch.person))
    data.append('email', dataFetch.email)
    data.append('roleId', dataFetch?.roleId || '')

    if (seller.img) {
      data.append('img', seller.img)
    }

    const {
      status,
      data: { id },
    } = await trackPromise(
      FetchingToken({
        url: `/account/${seller.id}?seller=true`,
        method: 'put',
        data,
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
      }),
      'sellers_admin'
    )

    if (status === 200) {
      dispatch(editSeller({ ...seller, id }))
    }
  }

export const startSuspenseSeller =
  (seller: Seller) => async (dispatch: (val?: SellerAction | any) => void) => {
    const { status } = await trackPromise(
      FetchingToken({
        url: `/account?state=${seller.state}`,
        method: 'put',
        data: {
          clients: [seller.id],
        },
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
      }),
      'sellers_admin'
    )

    if (status === 200) {
      dispatch(suspenseSeller(seller))
    }
  }

export const startGetAllSellers =
  () =>
  async (dispatch: (val?: SellerAction | any) => void, redux: () => Redux) => {
    const { roles } = redux().auth
    const sellerRole = roles?.find((rol) => rol.name === 'seller')

    const { status, data } = await trackPromise(
      FetchingToken({
        url: `/account?filters=[{"param":"roleId","value":"${sellerRole?.id}"}]`,
        method: 'get',
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
      }),
      'All_sellers_admin'
    )

    if (status === 200) {
      dispatch(getAllSellersAction(data.accounts))
    }
  }

export const startGetSeller =
  (page: number) =>
  async (dispatch: (val?: SellerAction | any) => void, redux: () => Redux) => {
    const { roles } = redux().auth
    const sellerRole = roles?.find((rol) => rol.name === 'seller')

    const { status, data } = await trackPromise(
      FetchingToken({
        url: `/account?filters=[{"param":"roleId","value":"${sellerRole?.id}"}]&skip=${page}&take=5`,
        method: 'get',
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
      }),
      'sellers_admin'
    )

    const sellers = data.accounts.map(
      ({ id, email, state, online, person }: any) => ({
        id,
        seller: person.typeSeller,
        address: person.address,
        doc: person.doc,
        phone: person.phone,
        allowAdviser: person.allowAdviser,
        allowChat: person.allowChat,
        name: person.name,
        lastName: person.lastName,
        online,
        email,
        dsto: person.commission,
        state,
      })
    )

    if (status === 200) {
      dispatch(
        getSellers({
          accounts: sellers,
          totalResults: data.totalResults,
        })
      )
    }
  }
