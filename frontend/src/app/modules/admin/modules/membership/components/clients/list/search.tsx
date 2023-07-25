import { ValidationsClient } from '@admin/modules/membership/validations'
import { Formik, Form } from 'formik'
import type { Client } from '@utils/interfaces'
import { useClient } from '@admin/modules/membership/hooks/useClient'
import { InputForm } from '@utils/components'
import { usePromiseTracker } from 'react-promise-tracker'
import { useSelector } from 'react-redux'
import { Redux } from '@redux/interfaces/redux'
import { startGetSearchClient } from '@redux/actions/admin/client'
import { setPageAction, setTypePage } from '@redux/actions/admin/utils'

interface IProps extends Client {
  membership: string
}

export const SearchClientComponent = () => {
  const init: IProps = {
    name: '',
    membership: '',
    doc: '',
    lastName: '',
  }

  const { suspendClient, editClient, dispatch } = useClient()

  const { list: membershipList } = useSelector((i: Redux) => i.admin.membership)

  const { promiseInProgress } = usePromiseTracker({ area: 'clients_admin' })
  return (
    <Formik
      initialValues={init}
      onSubmit={(val) => {
        dispatch(startGetSearchClient(val))
      }}
      validationSchema={ValidationsClient}
    >
      {({ resetForm }) => (
        <Form className="w-full">
          <div className="flex flex-col md:flex-row w-full gap-3">
            <InputForm
              name="membership"
              as="select"
              text="Membresía"
              className="select-sm"
              disabled={promiseInProgress}
              autoComplete="off"
            >
              <option value="">Seleccionar membresía</option>
              {membershipList?.map(
                ({ id, name, state }, i) =>
                  state && (
                    <option key={i} value={id}>
                      {name}
                    </option>
                  )
              )}
            </InputForm>

            <InputForm
              name="name"
              text="Nombre"
              placeholder="Ingresa el nombre"
              className="input-sm"
              disabled={promiseInProgress}
              autoComplete="off"
            />
            <InputForm
              name="lastName"
              text="Apellido"
              placeholder="Ingresa el apellido"
              className="input-sm"
              disabled={promiseInProgress}
              autoComplete="off"
            />
            <InputForm
              name="doc"
              text="Documento"
              placeholder="Ingresa el documento"
              className="input-sm"
              disabled={promiseInProgress}
              autoComplete="off"
            />

            <div className="tooltip mt-6" data-tip="recargar">
              <button
                type="button"
                className="btn btn-sm btn-circle "
                onClick={() => {
                  resetForm()
                  dispatch(setPageAction(1))
                  dispatch(setTypePage('clients'))
                }}
              >
                <i className="fa-solid fa-repeat"></i>
              </button>
            </div>
          </div>

          <div className="flex w-full flex-wrap justify-between gap-3 mt-4">
            <button
              type="submit"
              className="btn gap-3 btn-sm w-full lg:w-[350px]  2xl:w-1/4  bg-blue-900 border-0"
              disabled={promiseInProgress}
            >
              <i className="fa-solid fa-magnifying-glass text-base" />
              Buscar
            </button>
            {/* <button
              type="button"
              onClick={restablecerPassword}
              className="btn gap-3 btn-sm w-full md:w-[350px]  2xl:w-1/5  border-0"
              disabled={promiseInProgress}
            >
              <i className="fa-solid fa-arrows-rotate" />
              Contraseña
            </button> */}
            <button
              type="button"
              className="btn gap-2 btn-sm w-full lg:w-[350px]  2xl:w-1/4  bg-red-500 border-0"
              onClick={() => suspendClient(false)}
              disabled={promiseInProgress}
            >
              <i className="fa-solid fa-plug text-base" />
              Suspender
            </button>
            <button
              type="button"
              className="btn gap-2 btn-sm w-full lg:w-[350px]  2xl:w-1/4  bg-[#6B6CB0] border-0"
              onClick={() => suspendClient(true)}
              disabled={promiseInProgress}
            >
              <i className="fa-solid fa-user-lock" />
              Activar
            </button>
            <button
              type="button"
              className="btn gap-2 btn-sm w-full md:w-[350px]  2xl:w-1/4  bg-sky-600 border-0"
              onClick={editClient}
              disabled={promiseInProgress}
            >
              <i className="fa-solid fa-pen-to-square text-base" />
              Modificar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
