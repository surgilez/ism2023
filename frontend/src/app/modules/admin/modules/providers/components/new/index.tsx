import { useEffect, useState } from 'react'
import { BtnNew } from '@utils/components/btn_new'
import { InputForm, Modal } from '@utils/components'
import { Formik, Form, Field } from 'formik'
import { IProvider } from '@admin/modules/providers/interfaces'
import { useDispatch, useSelector } from 'react-redux'
import {
  activeProvider,
  startAddNewProvider,
  startEditProvider,
} from '@redux/actions'
import { Redux } from '@redux/interfaces/redux'
import { usePromiseTracker } from 'react-promise-tracker'
import { ProviderService } from './services'
import { ProviderValidation } from '../../validations'
import { AES, enc } from 'crypto-js'

export const NewProvider = () => {
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()
  const { active } = useSelector((i: Redux) => i.provider)
  const initState: IProvider = {
    name: '',
    contact: '',
    country: '',
    state: true,
    phone: '',
    webPage: '',
    credentials: {
      username: '',
      password: '',
      endPoint: '',
      confirmPassword: '',
    },
    services: [
      {
        name: 'Hoteles',
        state: true,
        profit: '',
      },
    ],
  }
  const [init, setInit] = useState(initState)

  useEffect(() => {
    if (active && active.active && active.action === 'edit') {
      const passwordBytes = AES.decrypt(
        active.active.credentials.password,
        process.env.DECRYPT_CREDENTIALS || ''
      )

      const userdBytes = AES.decrypt(
        active.active.credentials.username,
        process.env.DECRYPT_CREDENTIALS || ''
      )

      const password = passwordBytes.toString(enc.Utf8)

      const username = userdBytes.toString(enc.Utf8)

      setInit({
        ...active.active,
        credentials: {
          ...active.active.credentials,
          username,
          password,
          confirmPassword: password,
        },
      })
      setOpenModal(true)
    } else {
      setInit(initState)
    }
  }, [dispatch, active])

  const { promiseInProgress } = usePromiseTracker({ area: 'providerList' })

  return (
    <>
      <BtnNew
        setOpenModal={setOpenModal}
        title="Configurar nuevo proveedor"
        active={promiseInProgress}
      />

      <Modal openModal={openModal}>
        <div className="flex flex-col justify-center items-center">
          <p className="text-center text-xl my-5">
            {active?.active ? active.active.name : 'Configurar nuevo proveedor'}
          </p>

          <Formik
            initialValues={init}
            onSubmit={(val, { resetForm }) => {
              if (active) {
                dispatch(startEditProvider(val))
              } else {
                dispatch(startAddNewProvider(val))
              }
              setOpenModal(false)
              setInit(initState)
              resetForm()
            }}
            validationSchema={ProviderValidation}
            enableReinitialize
          >
            {({ values, resetForm, errors }) => (
              <Form className="w-full mt-8">
                <div className="flex flex-col md:flex-row gap-4 ">
                  <div className="flex flex-col w-full md:w-1/2 gap-4">
                    <InputForm
                      name="name"
                      text="Nombre"
                      placeholder="Nombre del proveedor"
                    />
                    <InputForm
                      name="contact"
                      text="Contacto"
                      placeholder="Nombre del contacto"
                    />
                    <InputForm name="country" text="País" placeholder="País" />
                  </div>
                  <div className="flex flex-col w-full md:w-1/2 gap-4">
                    <InputForm
                      name="webPage"
                      text="Sitio Web"
                      placeholder="https://example.com"
                    />
                    <InputForm
                      name="phone"
                      text="Teléfono"
                      placeholder="+593 97 979 2049"
                    />
                    <div className="form-control mt-4">
                      <label className="label cursor-pointer flex justify-start gap-3">
                        <span className="label-text">Habilitar</span>
                        <Field
                          type="checkbox"
                          className="toggle toggle-primary"
                          name="state"
                          //   disabled={active && !active.state}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <hr className="my-5" />

                <div>
                  <small className="text-gray-500">Credenciales</small>
                  <div className="flex flex-col md:flex-row gap-4 mt-5">
                    <div className="flex flex-col w-full md:w-1/2 gap-4">
                      <InputForm
                        name="credentials.username"
                        text="Usuario"
                        placeholder="Usuario or Correo"
                      />

                      <InputForm
                        name="credentials.endPoint"
                        text="Url de conexión"
                        placeholder="EndPoint"
                        type="endPoint"
                      />
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 gap-4">
                      <InputForm
                        name="credentials.password"
                        text="Contraseña"
                        type="password"
                        placeholder="contraseña"
                      />
                      <InputForm
                        name="credentials.confirmPassword"
                        text="Confirmar contraseña"
                        placeholder="Confirmar contraseña"
                        type="password"
                      />
                    </div>
                  </div>
                </div>

                <hr className="my-5" />

                <div>
                  <small className="text-gray-500 block">Servicios</small>
                  {errors.services && (
                    <span className="text-red-500 text-sm mt-5 block">
                      * {errors.services as string}
                    </span>
                  )}
                  <ProviderService values={values} />
                </div>

                <div className="flex gap-4 w-full mt-10">
                  <button
                    type="button"
                    className="btn w-[48%]"
                    onClick={() => {
                      setOpenModal(false)
                      resetForm()

                      if (active) {
                        dispatch(activeProvider(undefined))
                      }
                    }}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary w-[48%]">
                    {active?.active ? 'Modificar' : 'Registrar'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  )
}
