import { startChecking } from '@redux/actions'
import { AdminProvidersAction, IActiveAction } from '@redux/interfaces/admin'
import { IProvider } from '@admin/modules/providers/interfaces'
import {
  GET_PROVIDERS,
  ACTIVE_PROVIDER,
  UPDATE_PROVIDER,
  SET_LIST_PROVIDER,
  RESET_PROVIDER_REPORT,
  ADD_NEW_PROVIDER,
} from '@redux/types'
import { trackPromise } from 'react-promise-tracker'
import { FetchingToken } from '@helpers/fetch'
import { defaultError } from '@helpers/error'

export const addProvider = (provider: IProvider): AdminProvidersAction => ({
  type: ADD_NEW_PROVIDER,
  payload: {
    aux: provider,
  },
})

export const getProviders = (list: IProvider[]): AdminProvidersAction => ({
  type: GET_PROVIDERS,
  payload: { list },
})

export const activeProvider = (
  active?: IActiveAction
): AdminProvidersAction => ({
  type: ACTIVE_PROVIDER,
  payload: { active },
})

export const setListProviderSelect = (
  select: number[] | string[]
): AdminProvidersAction => ({
  type: SET_LIST_PROVIDER,
  payload: { select },
})

export const setResetProvider = (aux: boolean): AdminProvidersAction => ({
  type: RESET_PROVIDER_REPORT,
  payload: { aux },
})

export const editProvider = (membership: IProvider): AdminProvidersAction => ({
  type: UPDATE_PROVIDER,
  payload: { aux: membership },
})

export const startAddNewProvider =
  (provider: IProvider) =>
  async (dispatch: (val?: AdminProvidersAction | any) => void) => {
    const {
      credentials: { confirmPassword, ...credentials },
      ...dataFetch
    } = provider

    dataFetch.services.map((service) => {
      service.profit = Number(service.profit)
      return service
    })

    const {
      status,
      data: { id, services },
    } = await trackPromise(
      FetchingToken({
        url: '/information-api',
        method: 'post',
        data: { ...dataFetch, credentials },
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
      }),
      'providerList'
    )

    if (status === 200) {
      dispatch(
        addProvider({
          ...provider,
          credentials: { ...credentials, confirmPassword },
          id,
          services,
        })
      )
    }
  }

export const startEditProvider =
  (provider: IProvider) =>
  async (dispatch: (val?: AdminProvidersAction | any) => void) => {
    // const { id, credentials, ...rest } = provider

    const { id, credentials, ...dataFetch } = provider
    delete credentials.confirmPassword

    dataFetch.services.map((service) => {
      service.profit = Number(service.profit)
      return service
    })

    const {
      status,
      data: {
        informationApi: { credentials: auth },
      },
    } = await trackPromise(
      FetchingToken({
        url: `/information-api/${id}`,
        method: 'put',
        data: {
          ...dataFetch,
          credentials: {
            username: credentials.username,
            password: credentials.password,
            endPoint: credentials.endPoint,
          },
        },
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
      }),
      'providerList'
    )

    if (status === 200) {
      dispatch(
        editProvider({
          ...provider,
          credentials: {
            ...provider.credentials,
            username: auth.username,
            password: auth.password,
            confirmPassword: auth.password,
          },
        })
      )
    }
  }

export const startGetProviders =
  () => async (dispatch: (val?: AdminProvidersAction | any) => void) => {
    const { status, data } = await trackPromise(
      FetchingToken({
        url: '/information-api',
        method: 'get',
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
      }),
      'providerList'
    )

    if (status === 200) {
      const list = data.map((item: IProvider) => ({
        ...item,
        credentials: {
          ...item.credentials,
          confirmPassword: item.credentials.password,
        },
      }))

      dispatch(getProviders(list))
    }
  }
