import {
  setCheckOutIDAction,
  // setCheckOutIDAction,
  setPaymentStateAction,
} from '@redux/actions/client'
import { Modal } from '@utils/components/modal'
import { useDispatch } from 'react-redux'
import { useEffect, useRef, Dispatch, SetStateAction } from 'react'
import { ComponentLoader } from '@utils/components/loader/component'

interface IProps {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  loader: boolean
}

export const ModalPayment = ({ openModal, loader, setOpenModal }: IProps) => {
  const dispatch = useDispatch()

  const handleCancelTransaction = () => {
    dispatch(setCheckOutIDAction(''))
    setOpenModal(false)
    window.location.reload()
  }
  const myForm = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const document = window.document
    const handleForm = () => {
      dispatch(setPaymentStateAction('checkout'))
    }
    document.addEventListener('submit', handleForm)
    return () => {
      document.removeEventListener('submit', handleForm)
    }
  }, [myForm, dispatch])

  return (
    <Modal openModal={openModal} className="w-[450px] relative ">
      <div className="w-full grid place-content-center">
        <div className="flex flex-col gap-4">
          <form
            action={window.location.href.replace('payment', 'checkout')}
            ref={myForm}
            className="paymentWidgets"
            data-brands="VISA MASTER DINERS DISCOVER AMEX"
          ></form>

          {!loader && (
            <button
              type="button"
              className="btn w-full"
              onClick={handleCancelTransaction}
            >
              Cancelar Transacción
            </button>
          )}
        </div>
      </div>
      {loader && (
        <div className="w-full h-full grid place-content-center bg-[rgba(0, 0, 0, 0.322)] items-center absolute top-0 left-0 right-0 bottom-0">
          <ComponentLoader />
        </div>
      )}
    </Modal>
  )
}
