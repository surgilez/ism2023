import { AssistantTravel } from './assistant'
import { BillDetailPayment } from './bill'
import { Field, Form, Formik } from 'formik'
import { GuestsDetails } from './rooms'
import { ModalPayment } from './modal'
import { PaymentDetail } from './detail'
import { PaymentValidation } from '../../validation/payment'
import { PhoneDetail } from './phone'
import { startVerifyBook } from '@redux/actions/client/payment'
import { usePayment } from '@client/hooks/payment'
import { useState, useEffect } from 'react'
import { VoucherDetail } from './voucher'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { TermsAndConditions } from './terms'
import { addZeroes } from '@helpers/payment'

export const ProcessPayment = () => {
  const { initValue, shopping, dispatch } = usePayment()
  const [assistant, setAssistant] = useState(false)
  const [openModalTermsAndConditions, setOpenModalTermsAndConditions] =
    useState(false)
  const [openModalPayment, setOpenModalPayment] = useState(false)
  const [loaderPayment, setLoaderPayment] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    if (!shopping.total || shopping.total === 0) {
      navigate('/client/shopping-cart', { replace: true })
    }
  }, [shopping.total, navigate])

  const handleOpenModalPayment = () => {
    setOpenModalPayment(true)
    setTimeout(() => {
      setLoaderPayment(false)
    }, 4000)
  }

  return (
    <div>
      <Formik
        initialValues={initValue}
        onSubmit={(val, {}) => {
          if (!val.acceptConditions) {
            return Swal.fire(
              'No se puede continuar con el proceso',
              'Para continuar con la compra debes aceptar los términos y condiciones',
              'info'
            )
          }
          let total = shopping.total || 0
          if (assistant && total !== 0) {
            total += 42
            val.cart?.push({
              name: 'Tarjeta de asistencia',
              description: 'Tarjeta de asistencia del viajero',
              price: 42,
              quantity: 1,
            })
          }
          val.amount = addZeroes(total.toFixed(2).toString())

          dispatch(startVerifyBook({ ...val }))
        }}
        enableReinitialize
        validationSchema={PaymentValidation}
      >
        {({ setValues, values, errors }) => {
          return (
            <Form>
              <div className="flex flex-col md:flex-row md:justify-between gap-6 text-white ">
                <div className="flex flex-col gap-4 md:w-[45%]">
                  <BillDetailPayment />
                  <VoucherDetail />
                  <GuestsDetails values={values} />
                  <PhoneDetail
                    setValues={setValues}
                    values={values}
                    errors={errors}
                  />
                </div>
                <div className="flex flex-col gap-4 order-2 w-full md:w-[45%] mt-10">
                  <PaymentDetail />
                  {/* <AssistantTravel /> */}

                  <div className="flex gap-4 items-center ">
                    <div className="form-control mt-4">
                      <label className="block w-fit label cursor-pointer">
                        <Field
                          type="checkbox"
                          className="toggle toggle-primary"
                          name="acceptConditions"
                        />
                      </label>
                    </div>
                    <span
                      className="text-sm cursor-pointer"
                      onClick={() => setOpenModalTermsAndConditions(true)}
                    >
                      Términos y condiciones
                    </span>
                  </div>

                  <div className="flex gap-4 justify-between">
                    {/* <button
                      type="submit"
                      className="btn btn__gold w-[48%] mt-10"
                      onClick={() => {
                        if (Object.keys(errors).length !== 0) {
                          return Swal.fire(
                            'No se puede continuar con el proceso',
                            'Error de formulario, revisa todos los campos obligatorios',
                            'warning'
                          )
                        }

                        setAssistant(true)
                        if (values.acceptConditions) {
                          handleOpenModalPayment()
                        }
                      }}
                    >
                      Pagar con asistencia
                    </button> */}
                    <button
                      type="submit"
                      className="btn btn__gold w-[48%] mt-10"
                      onClick={() => {
                        if (Object.keys(errors).length !== 0) {
                          return Swal.fire(
                            'No se puede continuar con el proceso',
                            'Error de formulario, revisa todos los campos obligatorios',
                            'warning'
                          )
                        }
                        setAssistant(false)
                        if (values.acceptConditions) {
                          handleOpenModalPayment()
                        }
                      }}
                    >
                      Pagar sin asistencia
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
      <ModalPayment
        openModal={openModalPayment}
        loader={loaderPayment}
        setOpenModal={setOpenModalPayment}
      />
      <TermsAndConditions
        openModal={openModalTermsAndConditions}
        setOpenModalTermsAndConditions={setOpenModalTermsAndConditions}
      />
    </div>
  )
}
