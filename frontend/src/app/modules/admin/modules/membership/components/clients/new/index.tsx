import { BtnNew } from '@utils/components/btn_new'
import { Form, Formik } from 'formik'
import { InputForm, Modal } from '@utils/components'
import { Redux } from '@redux/interfaces/redux'
import {
  startAddNewClient,
  startEditClient,
  startGetAllSellers,
} from '@redux/actions'
import { useClient } from '@admin/modules/membership/hooks/useClient'
import { useDispatch, useSelector } from 'react-redux'
import { usePromiseTracker } from 'react-promise-tracker'
import { ValidationNewClient } from '@admin/modules/membership/validations'
import FieldArrayMembership from './fieldArray'
import { useEffect } from 'react'

export const NewClient = () => {
  const { openModal, setOpenModal, clientActive, handleCancelOption, init } =
    useClient()

  const dispatch = useDispatch()
  const {
    seller: { allSellers },
    membership: { list: membershipList },
  } = useSelector((i: Redux) => i.admin)

  useEffect(() => {
    if (!allSellers) {
      dispatch(startGetAllSellers())
    }
  }, [allSellers, dispatch])

  const { promiseInProgress } = usePromiseTracker({ area: 'clients_admin' })
  const { promiseInProgress: promiseAllSeller } = usePromiseTracker({
    area: 'All_sellers_admin',
  })

  return (
    <>
      <BtnNew
        setOpenModal={setOpenModal}
        title="Crear nuevo cliente"
        active={promiseInProgress}
      />

      <Modal openModal={openModal}>
        <div className="flex flex-col justify-center items-center">
          <p className="text-center text-xl">
            {clientActive ? 'Detalles cliente existente' : 'Nuevo cliente'}
          </p>

          <Formik
            initialValues={init}
            onSubmit={(val, { resetForm }) => {
              const membershipInfo = val?.membershipInfo?.map((item: any) => ({
                ...item,
                id: JSON.parse(item.id).id,
              }))
              val.membershipInfo = membershipInfo

              if (clientActive) {
                dispatch(startEditClient({ ...val }))
              } else {
                dispatch(startAddNewClient(val))
              }

              handleCancelOption()
              resetForm()
            }}
            validationSchema={ValidationNewClient}
            enableReinitialize
          >
            {({ values, resetForm, errors }) => (
              <Form className="w-full md:px-20 mt-5">
                <div className="w-full flex flex-col gap-5 my-5 md:flex-row">
                  <div className="w-full md:w-1/2">
                    <InputForm
                      name="name"
                      autoComplete="off"
                      text="Nombre"
                      placeholder="Ingresa el nombre"
                      disabled={promiseInProgress}
                    />
                    <InputForm
                      name="lastName"
                      autoComplete="off"
                      text="Apellido"
                      placeholder="Ingresa el apellido"
                      disabled={promiseInProgress}
                    />
                    <InputForm
                      name="doc"
                      autoComplete="off"
                      text="Documento"
                      placeholder="Documento"
                      disabled={promiseInProgress}
                    />
                    <InputForm
                      name="email"
                      autoComplete="off"
                      type="email"
                      text="Correo electrónico"
                      placeholder="Ingresa el correo"
                      disabled={promiseInProgress}
                    />
                    <InputForm
                      name="seller"
                      autoComplete="off"
                      as="select"
                      text="Asignar vendedor"
                      disabled={promiseInProgress || promiseAllSeller}
                    >
                      <option value="" disabled>
                        Seleccionar vendedor
                      </option>
                      {allSellers &&
                        allSellers.map(({ id, person }, i) => (
                          <option
                            value={id}
                            key={i}
                          >{`${person?.name} ${person?.lastName} - (${person?.typeSeller})`}</option>
                        ))}
                    </InputForm>
                  </div>

                  <div className="flex flex-col gap-2 md:w-1/2">
                    <FieldArrayMembership
                      values={values}
                      errors={errors}
                      membershipList={membershipList}
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-4 md:flex-row md:pr-4">
                  <button
                    type="button"
                    className="btn btn-base md:w-1/2"
                    onClick={() => {
                      handleCancelOption()
                      resetForm()
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary btn-base md:w-1/2 gap-3"
                  >
                    <i className="fa-solid fa-cart-shopping text-sm" />
                    {clientActive ? 'Modificar' : 'Agregar'}
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
