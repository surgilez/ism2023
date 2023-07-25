/* eslint-disable @typescript-eslint/no-explicit-any */
import { MembershipAction } from '@redux/interfaces/admin'
import {
  ADD_NEW_MEMBERSHIP,
  ACTIVE_MEMBERSHIP,
  UPDATE_MEMBERSHIP,
  DELETE_MEMBERSHIP,
  GET_MEMBERSHIP,
  SUSPENSE_MEMBERSHIP,
} from '@redux/types'
import { Membership } from '@utils/interfaces'
import moment from '@helpers/moment'
import { FetchingToken } from '@helpers/fetch'
import { trackPromise } from 'react-promise-tracker'
import { defaultError } from '@helpers/error'
import { startChecking } from '../auth'

export const getMembership = (list?: Membership[]): MembershipAction => ({
  type: GET_MEMBERSHIP,
  payload: { list },
})

export const addMembership = (aux: Membership): MembershipAction => ({
  type: ADD_NEW_MEMBERSHIP,
  payload: { aux },
})

export const activeMembership = (active?: Membership): MembershipAction => ({
  type: ACTIVE_MEMBERSHIP,
  payload: { active },
})

export const editMembership = (membership: Membership): MembershipAction => ({
  type: UPDATE_MEMBERSHIP,
  payload: { aux: membership },
})

export const deleteMembership = (): MembershipAction => ({
  type: DELETE_MEMBERSHIP,
})

export const suspenseMembership = (
  membership: Membership
): MembershipAction => ({
  type: SUSPENSE_MEMBERSHIP,
  payload: {
    aux: membership,
  },
})

export const startAddNewMembership =
  (membership: Membership) =>
  async (dispatch: (val?: MembershipAction | any) => void) => {
    const { exp, price, services, ...dataFetch } = membership

    const expiration = moment(exp).unix()
    const fetchPrice = Number(price)
    const fetchServices = services?.map((service) => {
      const { id } = JSON.parse(service.service as string)
      return {
        id,
        dsto: Number(service.dsto),
      }
    })

    const form = new FormData()

    const dataFe = {
      ...dataFetch,
      exp: expiration,
      price: fetchPrice,
      services: fetchServices,
    }

    form.append('data', JSON.stringify(dataFe))

    if (membership.img) {
      form.append('img', membership.img)
    }

    const { status, data } = await trackPromise(
      FetchingToken({
        url: '/membership',
        method: 'post',
        data: form,
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
      }),
      'membershipList'
    )

    if (status === 200) {
      data.exp = moment.unix(data.exp).format('yyyy-MM-DD')
      data.services = data.services.map(
        ({ id, dsto, service, serviceId }: any) => {
          const { informationApiId } = service
          data.serviceId = serviceId
          return {
            id,
            dsto,
            provider: informationApiId,
            service: JSON.stringify(service),
          }
        }
      )

      dispatch(addMembership(data))
    }
  }

export const startEditMembership =
  (membership: Membership) =>
  async (dispatch: (val?: MembershipAction | any) => void) => {
    const { exp, price, services, ...dataFetch } = membership

    const expiration = moment(exp).unix()
    const fetchPrice = Number(price)
    const fetchServices = services?.map((service) => ({
      id: membership.serviceId,
      dsto: Number(service.dsto),
    }))

    const form = new FormData()

    const dataFe = {
      ...dataFetch,
      exp: expiration,
      price: fetchPrice,
      services: fetchServices,
    }

    form.append('data', JSON.stringify(dataFe))

    if (membership.img) {
      form.append('img', membership.img)
    }

    const { status, data } = await trackPromise(
      FetchingToken({
        url: `/membership/${dataFetch.id}`,
        method: 'put',
        data: form,
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
      }),
      'membershipList'
    )

    if (status === 200) {
      dispatch(
        editMembership({ ...membership, img: data.membership.img || '' })
      )
    }
  }

export const startDeleteMembership =
  () => async (dispatch: (val?: MembershipAction) => void) => {
    dispatch(deleteMembership())
  }

export const startSuspenseMembership =
  (membership: Membership) =>
  async (dispatch: (val?: MembershipAction | any) => void) => {
    const { status } = await trackPromise(
      FetchingToken({
        url: `/membership?state=${membership.state}`,
        method: 'put',
        data: { memberships: [membership.id] },
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
      }),
      'membershipUpdateState'
    )

    if (status === 200) {
      dispatch(suspenseMembership(membership))
    }
  }

export const startGetMembership =
  () => async (dispatch: (val?: MembershipAction | any) => void) => {
    const { status, data } = await trackPromise(
      FetchingToken({
        url: '/membership',
        method: 'get',
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
      }),
      'membershipList'
    )

    if (status === 200) {
      const mapData = data.map((membership: any) => {
        membership.exp = moment.unix(membership.exp).format('yyyy-MM-DD')
        membership.services = membership.services.map(
          ({ id, dsto, service, serviceId }: any) => {
            const { informationApiId } = service
            membership.serviceId = serviceId
            return {
              id,
              dsto,
              provider: informationApiId,
              service: JSON.stringify(service),
            }
          }
        )
        return membership
      })
      dispatch(getMembership(mapData))
    }
  }
