import { Redux } from '@redux/interfaces/redux'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { checkoutStatusPayment } from '@redux/actions/client'
import { SuspenseLoader } from '@utils/components'
import { useNavigate } from 'react-router-dom'
import { setPaymentStateAction } from '@redux/actions/client/payment'

export const Checkout = () => {
  const { state, checkoutId } = useSelector((i: Redux) => i.client.payment)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    let pageRedirect = ''

    if (state === 'success') {
      pageRedirect = '/history-travel'
    }

    if (state === 'error') {
      pageRedirect = '/'
    }

    navigate(pageRedirect, { replace: true })
  }, [state, dispatch, navigate])

  useEffect(() => {
    if (!checkoutId) {
      dispatch(setPaymentStateAction('error'))
      navigate('/')
    } else {
      dispatch(checkoutStatusPayment())
    }
  }, [dispatch, checkoutId, navigate])

  useEffect(() => {
    const beforeUnloadListener = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      return (event.returnValue = 'Leaving this page will reset the wizard')
    }

    addEventListener('beforeunload', beforeUnloadListener, { capture: true })

    return () => {
      removeEventListener('beforeunload', beforeUnloadListener, {
        capture: true,
      })
    }
  }, [])

  return (
    <div>
      {state === 'checkout' ? (
        <SuspenseLoader />
      ) : (
        <small>
          Procesando información de pago, por favor. No cierre esta ventana!
        </small>
      )}
    </div>
  )
}
