import { startAddNewSeller, startEditSeller } from '@redux/actions'
import { ComponentLoader, InputForm, Modal } from '@utils/components'
import { BtnNew } from '@utils/components/btn_new'
import { Formik, Form, Field } from 'formik'
import { usePromiseTracker } from 'react-promise-tracker'
import { useSeller } from '../hooks/useSeller'
import { SellerValidation } from '../validations'

export const NewSeller = () => {
  const {
    openModal,
    setOpenModal,
    active,
    init,
    dispatch,
    setInit,
    initState,
    handleCancelAction,
    handleSuspenseItem,
  } = useSeller()

  const { promiseInProgress } = usePromiseTracker({ area: 'sellers_admin' })

  return (
    <>
      <BtnNew
        setOpenModal={setOpenModal}
        title="Crear nuevo vendedor"
        active={promiseInProgress}
      />

      <Modal openModal={openModal}>
        {promiseInProgress ? (
          <div className="min-h-[60vh] grid place-content-center">
            <ComponentLoader />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center ">
            <p className="text-center text-xl my-5 font-bold">
              {active ? `${active.name}` : 'Nuevo vendedor'}
            </p>

            <Formik
              initialValues={init}
              onSubmit={(val) => {
                if (active) {
                  dispatch(startEditSeller(val))
                } else {
                  dispatch(startAddNewSeller(val))
                }
                setOpenModal(false)
                setInit(initState)
              }}
              validationSchema={SellerValidation}
              enableReinitialize
            >
              {({ resetForm }) => (
                <Form>
                  <div className="w-full flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/2 flex flex-col gap-3">
                      <InputForm
                        name="seller"
                        text="Tipo de vendedor"
                        type="seller"
                        as="select"
                        disabled={active && !active.state}
                      >
                        <option value="">Seleccione tipo de vendedor</option>
                        <option value="interno">Interno</option>
                        <option value="externo">Externo</option>
                      </InputForm>

                      <InputForm
                        name="address"
                        text="Domicilio"
                        type="phone"
                        placeholder="dirección"
                        autoComplete="off"
                        disabled={active && !active.state}
                      />

                      <div className="flex gap-2 justify-between">
                        <InputForm
                          name="doc"
                          text="Documento"
                          type="phone"
                          placeholder="AV5673"
                          disabled={active && !active.state}
                        />

                        <InputForm
                          name="phone"
                          text="Teléfono"
                          type="phone"
                          placeholder="098378920"
                          disabled={active && !active.state}
                        />
                      </div>
                      <div className="form-control mt-4">
                        <label className="label cursor-pointer flex justify-start gap-3">
                          <span className="label-text">Permisos de asesor</span>
                          <Field
                            type="checkbox"
                            className="toggle toggle-primary"
                            name="allowAdviser"
                            disabled={active && !active.state}
                          />
                        </label>
                      </div>
                      <div className="form-control mt-4">
                        <label className="label cursor-pointer flex justify-start gap-3">
                          <span className="label-text">Permisos de chat</span>
                          <Field
                            type="checkbox"
                            className="toggle toggle-primary"
                            name="allowChat"
                            disabled={active && !active.state}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 md:w-1/2">
                      <InputForm
                        name="name"
                        text="Nombre"
                        placeholder="Ingrese los nombres"
                        disabled={active && !active.state}
                      />
                      <InputForm
                        name="lastName"
                        text="Apellido"
                        placeholder="Ingrese los apellidos"
                        disabled={active && !active.state}
                      />
                      <InputForm
                        name="email"
                        type="email"
                        text="Correo"
                        placeholder="Ingrese correo electrónico"
                        disabled={active && !active.state}
                      />
                      <InputForm
                        name="dsto"
                        text="% Comisión"
                        placeholder="Ej: 10%"
                        disabled={active && !active.state}
                      />
                    </div>
                  </div>

                  <div
                    className={`flex flex-col mt-5 justify-between gap-4 md:flex-row md:pr-4 ${
                      active && 'md:flex-wrap'
                    }`}
                  >
                    <button
                      type="button"
                      className="btn btn-base md:w-1/2 "
                      onClick={() => {
                        handleCancelAction()
                        resetForm()
                      }}
                    >
                      Cancelar
                    </button>

                    {active && active.state && (
                      <button
                        type="button"
                        className="btn btn-base md:flex-1 bg-[#6B6CB0] border-0 gap-3"
                        onClick={() =>
                          handleSuspenseItem({ ...active, state: false })
                        }
                      >
                        <i className="fa-solid fa-user-lock" />
                        Suspender
                      </button>
                    )}

                    {active && !active.state && (
                      <button
                        type="button"
                        className="btn btn-base md:flex-1 bg-sky-600 border-0 gap-3"
                        onClick={() =>
                          handleSuspenseItem({ ...active, state: true })
                        }
                      >
                        <i className="fa-solid fa-user-lock" />
                        Activar
                      </button>
                    )}

                    {!active ? (
                      <button
                        type="submit"
                        className="btn btn-primary btn-base md:w-1/2 gap-3"
                      >
                        <i className="fa-solid fa-pencil text-sm" />
                        Crear
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary btn-base md:w-1/2 gap-3"
                        disabled={active && !active.state}
                      >
                        <i className="fa-solid fa-pencil text-sm" />
                        Modificar
                      </button>
                    )}

                    {active && (
                      <button
                        type="button"
                        className="btn btn-base md:flex-1 border-0 gap-3 bg-blue-900"
                        onClick={() => {
                          handleCancelAction()
                          resetForm()
                        }}
                      >
                        <i className="fa-solid fa-xmark" />
                        Cerrar
                      </button>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </Modal>
    </>
  )
}
