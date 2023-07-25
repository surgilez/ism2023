import Logo from '@assets/logo.png'
import { ComponentLoader, InputForm } from '@utils/components'
import { Form, Formik } from 'formik'
import { startRecoverPassword } from '@redux/actions'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { usePromiseTracker } from 'react-promise-tracker'
import { validationsRecover } from '../validations/recover'

export const RecoverPassword = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [token, setToken] = useState('')

  useEffect(() => {
    const token = params.get('token')
    if (!token) {
      navigate('/forgot-password', { replace: true })
    } else {
      setToken(token)
    }
  }, [params, navigate, setToken])

  const init = {
    password: '',
    confirmPassword: '',
  }

  const dispatch = useDispatch()

  const { promiseInProgress } = usePromiseTracker({ area: 'recoverPassword' })

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
                dispatch(startRecoverPassword(val.password, token))
                resetForm()
              }}
              validationSchema={validationsRecover}
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
                    name="password"
                    type="password"
                    text="Contraseña"
                    placeholder="nueva contraseña"
                  />
                  <InputForm
                    name="confirmPassword"
                    type="password"
                    text="Confirmar Contraseña"
                    placeholder="confirmar contraseña"
                  />
                </div>
                <div className="mt-10">
                  <button type="submit" className="btn w-full btn__gold">
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
