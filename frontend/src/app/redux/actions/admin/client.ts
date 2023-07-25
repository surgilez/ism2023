/* eslint-disable @typescript-eslint/no-explicit-any */
import { trackPromise } from 'react-promise-tracker'
import { Redux } from '@redux/interfaces/redux'
import { ClientAction } from '@redux/interfaces/admin/client'
import {
  SET_LIST_CLIENTS,
  SET_CLIENTS,
  SUSPENSE_CLIENTS,
  SET_RESET_CLIENT,
  EDIT_CLIENT,
  SET_ACTIVE_CLIENT,
  ADD_NEW_CLIENT,
  SET_TOTAL_REGISTROS,
} from '@redux/types'
import { Client } from '@utils/interfaces'
import { FetchingToken } from '@helpers/fetch'
import { defaultError } from '@helpers/error'
import { startChecking } from '../auth'
import { setPageAction } from './utils'
import Swal from 'sweetalert2'

export const addNewClient = (aux: Client): ClientAction => ({
  type: ADD_NEW_CLIENT,
  payload: { aux },
})

export const setSelectClients = (
  select: number[] | string[]
): ClientAction => ({
  type: SET_LIST_CLIENTS,
  payload: { select },
})

export const setTotalRegistros = (aux: number): ClientAction => ({
  type: SET_TOTAL_REGISTROS,
  payload: { aux },
})

export const setClients = (list: {
  accounts: Client[]
  totalResults: number
}): ClientAction => ({
  type: SET_CLIENTS,
  payload: { list },
})

export const suspenseClients = (state: boolean): ClientAction => ({
  type: SUSPENSE_CLIENTS,
  payload: {
    aux: state,
  },
})

export const setResetClient = (aux: boolean): ClientAction => ({
  type: SET_RESET_CLIENT,
  payload: { aux },
})

export const editClient = (client: Client): ClientAction => ({
  type: EDIT_CLIENT,
  payload: { aux: client },
})

export const setActiveClient = (aux?: any): ClientAction => ({
  type: SET_ACTIVE_CLIENT,
  payload: { aux },
})

export const startGetClient =
  (page: number) =>
  async (dispatch: (val?: ClientAction | any) => void, redux: () => Redux) => {
    const { roles } = redux().auth
    const clientRole = roles?.find((rol) => rol.name === 'client')

    const { status, data } = await trackPromise(
      FetchingToken({
        url: `/account?filters=[{"param":"roleId","value":"${clientRole?.id}"}]&skip=${page}&take=10`,
        method: 'get',
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
      }),
      'clients_admin'
    )

    if (status === 200 && data) {
      const clients = data.accounts.map(
        ({ id, email, state, online, person, memberships }: any) => ({
          id,
          name: person.name,
          lastName: person.lastName,
          doc: person.doc,
          email,
          state,
          online,
          seller: person.sellerId,
          membershipInfo: memberships,
        })
      )
      dispatch(
        setClients({
          accounts: clients,
          totalResults: data.totalResults,
        })
      )
    }
  }

export const startAddNewClient =
  (client: Client) =>
  async (dispatch: (val?: ClientAction | any) => void, redux: () => Redux) => {
    const {
      auth: { roles },
      admin,
      utils: { page: currentPage },
    } = redux()

    const clientRole = roles?.find((rol) => rol.name === 'client')

    const dataFetch = {
      roleId: clientRole?.id,
      email: client.email,
      person: {
        name: client.name,
        lastName: client.lastName,
        doc: client.doc,
        sellerId: client.seller,
      },
    }

    const form = new FormData()
    form.append('roleId', clientRole?.id || '')
    form.append('email', client.email || '')
    form.append('person', JSON.stringify(dataFetch.person))
    form.append('memberships', JSON.stringify(client.membershipInfo))

    const { status, data } = await trackPromise(
      FetchingToken({
        url: '/account',
        method: 'post',
        data: form,
      }).catch(({ response: { status: errStatus } }) => {
        console.log(errStatus)
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
      }),
      'clients_admin'
    )
    console.log(status, data)
    if (status === 200) {
      enviarCredenciales(
        client.email ? client.email : '',
        client.doc ? client.doc : ''
      )
      dispatch(setTotalRegistros((admin.client.list?.totalResults || 0) + 1))
      const clientsTotal = (admin.client.list?.accounts.length || 0) + 1

      if (clientsTotal <= 10) {
        //dispatch(addNewClient({ ...client, data.id?data.id:'' }))
      } else {
        dispatch(setPageAction((currentPage || 1) + 1))
      }
    }
  }

export const enviarCredenciales = async (
  email: string,
  contrasenia: string
) => {
  const { status, data } = await trackPromise(
    FetchingToken({
      url: '/send/account',
      method: 'post',
      data: { email: email, contrasenia: contrasenia },
    }).catch(({ response: { status: errStatus } }) => {
      console.log(errStatus)
    }),
    'clients_admin'
  )
  if (status == 200) {
    Swal.fire(
      'Cuenta creada con exito',
      'Las credenciales han sido enviadas al correo usuario',
      'success'
    )
  } else {
    Swal.fire(
      'Error al crear el usuario',
      'No se pudo enviar el correo al usuario',
      'warning'
    )
  }
}

export const startSuspendClients =
  (state: boolean) =>
  async (dispatch: (val?: ClientAction | any) => void, redux: () => Redux) => {
    const { select } = redux().admin.client

    const { status } = await trackPromise(
      FetchingToken({
        url: `/account?state=${state}`,
        method: 'put',
        data: {
          clients: select,
        },
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
      }),
      'clients_admin'
    )

    if (status === 200) {
      dispatch(suspenseClients(state))
    }
  }

export const startResetPassword =
  (clients: string[] | number[]) => async () => {
    console.log(clients)
  }

export const startEditClient =
  (client: Client) =>
  async (dispatch: (val?: ClientAction | any) => void, redux: () => Redux) => {
    const { roles } = redux().auth
    const clientRole = roles?.find((rol) => rol.name === 'client')

    const dataFetch = {
      roleId: clientRole?.id,
      email: client.email,
      person: {
        name: client.name,
        lastName: client.lastName,
        doc: client.doc,
        sellerId: client.seller,
      },
    }

    const form = new FormData()
    form.append('roleId', clientRole?.id || '')
    form.append('email', client.email || '')
    form.append('person', JSON.stringify(dataFetch.person))
    form.append('memberships', JSON.stringify(client.membershipInfo))

    const {
      status,
      data: { id },
    } = await trackPromise(
      FetchingToken({
        url: `/account/${client.id}`,
        method: 'put',
        data: form,
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
      }),
      'clients_admin'
    )

    if (status === 200) {
      dispatch(editClient({ ...client, id }))
    }
  }

export const startGetSearchClient =
  (data: any) => async (dispatch: (val?: any) => void) => {
    if (!data.doc && !data.lastName && !data.membership && !data.name) {
      return Swal.fire(
        'Ooops!',
        'Ingresa al menos un parámetro de búsqueda',
        'warning'
      )
    }
    const {
      status,
      data: { accounts },
    } = await trackPromise(
      FetchingToken({
        url: `/accounts`,
        method: 'post',
        data,
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
      }),
      'clients_admin'
    )

    if (status === 200) {
      const clients = accounts.map(
        ({ id, email, state, online, person, memberships }: any) => ({
          id,
          name: person.name,
          lastName: person.lastName,
          doc: person.doc,
          email,
          state,
          online,
          seller: person.sellerId,
          membershipInfo: memberships,
        })
      )
      dispatch(
        setClients({
          accounts: clients,
          totalResults: -1,
        })
      )
    }
  }
