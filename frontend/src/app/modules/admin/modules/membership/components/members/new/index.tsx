import Card from '@assets/card.png'
import { ComponentLoader, Modal } from '@utils/components'
import { Formik, Form } from 'formik'
import { membershipValidations } from '@admin/modules/membership/validations'
import { startAddNewMembership, startEditMembership } from '@redux/actions'
import { BtnNew } from '@utils/components/btn_new'
import { useMembership } from '@admin/modules/membership/hooks/useMembership'
import { InputForm } from '@utils/components/form/input'
import moment from '@helpers/moment'
import { usePromiseTracker } from 'react-promise-tracker'
import FieldArrayMotors from './fieldArray'

export const NewMembership = () => {
  const {
    openModal,
    setOpenModal,
    active,
    dispatch,
    setInit,
    init,
    handleOpenInputImg,
    refImg,
    initState,
    handleCancelAction,
    handleChangeImg,
    inputImgRef,
    handleSuspense,
    listProviders,
  } = useMembership()

  const { promiseInProgress } = usePromiseTracker({
    area: 'membershipUpdateState',
  })

  return (
    <>
      <BtnNew setOpenModal={setOpenModal} title="Crear nueva membresía" />

      <Modal openModal={openModal}>
        <div className="flex flex-col justify-center items-center ">
          {promiseInProgress ? (
            <div className="min-h-[50vh] grid place-content-center">
              <ComponentLoader />
            </div>
          ) : (
            <div>
              <p className="text-center text-xl my-5">
                {active
                  ? `Detalle membresía ${active.name}`
                  : 'Nueva membresía'}
              </p>

              <Formik
                initialValues={init}
                onSubmit={(val, { resetForm }) => {
                  if (active) {
                    dispatch(startEditMembership(val))
                    setInit(initState)
                  } else {
                    dispatch(startAddNewMembership(val))
                    resetForm()
                  }
                  setOpenModal(false)
                }}
                validationSchema={membershipValidations}
                enableReinitialize
              >
                {({ setFieldValue, errors, values, resetForm }) => (
                  <Form className="w-full">
                    <div
                      className="my-4 cursor-pointer w-[120px] h-[100px] flex flex-col justify-between"
                      onClick={handleOpenInputImg}
                    >
                      <span className="text-sm block ">Diseño tarjeta</span>
                      <img
                        ref={refImg}
                        src={
                          values.img
                            ? `${process.env.BACKEND}/${values.img}`
                            : Card
                        }
                        alt=""
                        className="w-[100px] rounded-lg object-cover block"
                      />
                    </div>
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-4  md:flex-row">
                        <div className="flex flex-col md:w-1/2">
                          <InputForm
                            name="name"
                            placeholder="Ingrese nombre de membresía"
                            text="Nombre membresía"
                            autoComplete="off"
                          />
                          <InputForm
                            name="code"
                            placeholder="Código de membresía"
                            text="Código membresía"
                            autoComplete="off"
                          />
                          <div className="mt-4 flex justify-between gap-2">
                            <InputForm
                              name="exp"
                              type="date"
                              min={moment(new Date()).format('yyyy-MM-DD')}
                              text="Vencimiento"
                            />
                            <InputForm
                              name="price"
                              text="Precio"
                              placeholder="1200 USD"
                              autoComplete="off"
                            />
                          </div>
                        </div>

                        <div className="mt-4 md:mt-0 flex flex-col gap-4 md:w-1/2">
                          {listProviders && (
                            <FieldArrayMotors
                              values={values}
                              providers={listProviders}
                              err={errors}
                            />
                          )}
                        </div>
                      </div>

                      <div
                        className={`flex flex-col justify-between gap-4 md:flex-row md:pr-4 ${
                          active && 'md:flex-wrap'
                        }`}
                      >
                        <button
                          type="button"
                          className="btn btn-base md:w-1/2"
                          onClick={() => {
                            handleCancelAction()
                            resetForm()
                          }}
                        >
                          Cancelar
                        </button>

                        {active && active?.state && (
                          <button
                            type="button"
                            className="btn btn-base md:flex-1 bg-[#6B6CB0] border-0 gap-3"
                            onClick={() =>
                              handleSuspense({ ...values, state: false })
                            }
                          >
                            <i className="fa-solid fa-plug text-base" />
                            Suspender
                          </button>
                        )}

                        {active && !active?.state && (
                          <button
                            type="button"
                            className="btn btn-base md:flex-1 bg-red-500 border-0 gap-3"
                            onClick={() =>
                              handleSuspense({ ...values, state: true })
                            }
                          >
                            <i className="fa-solid fa-plug text-base" />
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
                          >
                            <i className="fa-solid fa-pencil text-sm" />
                            Modificar
                          </button>
                        )}
                      </div>
                    </div>

                    <input
                      title="inputImg"
                      id="file"
                      name="img"
                      type="file"
                      ref={inputImgRef}
                      onChange={(ev) => handleChangeImg(ev, setFieldValue)}
                      className="hidden"
                    />
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}
