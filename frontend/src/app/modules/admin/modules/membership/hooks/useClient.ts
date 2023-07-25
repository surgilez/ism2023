import { Redux } from '@redux/interfaces/redux'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import {
  startSuspendClients,
  startResetPassword,
  setActiveClient,
  setResetClient,
} from '@redux/actions'
import type { Client } from '@utils/interfaces'

export const useClient = () => {
  const { select } = useSelector((i: Redux) => i.admin.client)
  const dispatch = useDispatch()

  const restablecerPassword = useCallback(() => {
    if (!select || select.length <= 0) {
      return Swal.fire('Error!', 'No existen clientes seleccionados', 'error')
    }

    return dispatch(startResetPassword(select))
  }, [select, dispatch])

  const suspendClient = useCallback(
    (state: boolean) => {
      if (select?.length === 0) {
        return Swal.fire('Error!', 'No existen clientes seleccionados', 'error')
      }

      return Swal.fire({
        title: `Deseas ${
          state ? 'activar' : 'suspender'
        } los clientes seleccionados?`,
        text: `Se han seleccionado ${select?.length} ${
          select?.length === 1 ? 'cliente' : 'clientes'
        }`,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: state ? 'Activar' : 'Suspender',
        cancelButtonText: 'Cancelar',
      }).then(({ isConfirmed }) => {
        if (isConfirmed && select) {
          dispatch(startSuspendClients(state))
        }
      })
    },
    [select, dispatch]
  )

  const editClient = useCallback(() => {
    if (select?.length === 0) {
      return Swal.fire('Error!', 'No existen clientes seleccionados', 'error')
    }
    if (select && select.length > 1) {
      return Swal.fire(
        'Proceso no completado!',
        'Solo puedes seleccionar un cliente',
        'warning'
      )
    }
    return dispatch(setActiveClient(true))
  }, [select, dispatch])

  const [openModal, setOpenModal] = useState<boolean>(false)

  const { clientActive } = useSelector((i: Redux) => i.admin.client)

  const initialState: Client = {
    name: '',
    lastName: '',
    email: '',
    state: true,
    seller: '',
    doc: '',
    membershipInfo: [
      {
        id: '',
        name: '',
      },
    ],
  }

  const [init, setInit] = useState<Client>(initialState)

  useEffect(() => {
    if (clientActive) {
      setOpenModal(true)
      setInit({ ...clientActive })
    }
  }, [clientActive, setOpenModal, setInit])

  const handleCancelOption = () => {
    setOpenModal(false)
    dispatch(setActiveClient(undefined))
    dispatch(setResetClient(true))
    if (clientActive) setInit(initialState)
    /*
     */
  }

  return {
    select,
    restablecerPassword,
    suspendClient,
    editClient,
    openModal,
    setOpenModal,
    initialState,
    init,
    setInit,
    handleCancelOption,
    clientActive,
    dispatch,
  }
}
