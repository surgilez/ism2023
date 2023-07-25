import Logo from '@assets/logo.png'
import { ComponentLoader, InputForm } from '@utils/components'
import { Form, Formik } from 'formik'
import { usePromiseTracker } from 'react-promise-tracker'
import { validationsForgot } from '../validations/forgot'
import { useDispatch } from 'react-redux'
import { startForgotPassword } from '@redux/actions'
import { useState } from 'react'

export const ForgotPasswordScreen = () => {
  const init = {
    email: '',
  }

  const dispatch = useDispatch()

  const { promiseInProgress } = usePromiseTracker({ area: 'forgotPassword' })
  const [lockButton, setLockButton] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-body">
      {promiseInProgress ? (
        <div className="h-screen w-full grid place-content-center">
          <ComponentLoader bg="bg-primary" />
        </div>
      ) : (
        <div className="w-full flex justify-center items-center h-screen">
          <div className="mx-5 w-full md:w-[500px] bg-base-100 shadow-2xl rounded-xl mb-24">
            <Formik
              initialValues={init}
              onSubmit={(val, { resetForm }) => {
                dispatch(startForgotPassword(val.email))
                resetForm()
                setLockButton(true)
              }}
              validationSchema={validationsForgot}
            >
              <Form className="p-5">
                <div className="flex flex-col gap-4 justify-center items-center">
                  <img
                    src={Logo}
                    alt="logo"
                    className="block object-cover w-[100px]"
                  />
                  <span className="text-md block">Recupera tu contraseña</span>
                </div>
                <div className="flex flex-col gap-4 mt-8">
                  <InputForm
                    name="email"
                    text="Correo Electrónico"
                    placeholder="example@gmail.com"
                  />
                </div>
                <div className="mt-10">
                  <button
                    type="submit"
                    className="btn w-full btn__gold"
                    disabled={lockButton}
                  >
                    Enviar
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  )
}
