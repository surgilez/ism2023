import { Formik, Form, Field } from 'formik'
import type { IEmailConfig } from '@admin/modules/config/interfaces'
import { ComponentLoader, InputForm } from '@utils/components'
import { emailConfigValidation } from '@admin/modules/config/validations'
import { useDispatch, useSelector } from 'react-redux'
import { startSendConfigEmail } from '@redux/actions/admin/config'
import { Redux } from '@redux/interfaces/redux'
import { useState, useEffect } from 'react'

export const EmailConfig = () => {
  const dispatch = useDispatch()

  const { email } = useSelector((i: Redux) => i.admin.config)

  const initState: IEmailConfig = {
    host: '',
    port: '',
    secure: false,
    auth: {
      user: '',
      pass: '',
    },
  }

  const [init, setInit] = useState(initState)

  useEffect(() => {
    if (email) {
      setInit(email)
    }
  }, [email])

  const promiseInProgress = false

  return (
    <div className="">
      {promiseInProgress ? (
        <div className="flex justify-center items-center min-h-[15vh]">
          <ComponentLoader />
        </div>
      ) : (
        <>
          <h1 className="font-bold">Correo electrónico</h1>

          <Formik
            initialValues={init}
            enableReinitialize
            onSubmit={(val) => {
              dispatch(startSendConfigEmail(val))
            }}
            validationSchema={emailConfigValidation}
          >
            {() => (
              <Form>
                <div className="mt-4 w-full flex flex-col md:flex-row gap-4 justify-between">
                  <div className="flex gap-4">
                    <InputForm
                      name="host"
                      className="input-sm w-full"
                      placeholder="smtp-example.com"
                      text="Host"
                    />
                    <InputForm
                      name="port"
                      className="input-sm w-full"
                      placeholder="587"
                      text="Puerto"
                    />
                  </div>
                  <div className="flex gap-4">
                    <InputForm
                      name="auth.user"
                      className="input-sm w-full"
                      placeholder="example@host.com"
                      text="Correo"
                    />
                    <InputForm
                      name="auth.pass"
                      type="password"
                      className="input-sm w-full"
                      placeholder="********"
                      text="Contraseña"
                    />
                  </div>
                  <div className="flex gap-4 items-center justify-between">
                    <div className="form-control">
                      <label className="label cursor-pointer flex items-center justify-start gap-3">
                        <span className="label-text whitespace-nowrap">
                          Puerto seguro?
                        </span>
                        <Field
                          type="checkbox"
                          className="toggle toggle-primary"
                          name="secure"
                        />
                      </label>
                    </div>

                    <button type="submit" className="btn btn-sm md:w-[200px]">
                      Guardar
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
    </div>
  )
}
