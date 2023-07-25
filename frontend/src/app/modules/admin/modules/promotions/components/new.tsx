/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputForm, Modal } from '@utils/components'
import { Formik, Form } from 'formik'
import NoFoundImg from '@assets/404.jpg'
import { startAddNewPromo, startEditPromo } from '@redux/actions'
import { ModalSearchHotelPromo } from '@api/ratehawk/components/promo/modal'
import moment from '@helpers/moment'
import { PromoAdminValidation } from '../validations'
import { usePromo } from '../hooks/usePromo'

// import { ApiServiceField } from './apiService' this component active dynamical promotion

export const NewPromo = ({ modal }: { modal: any }) => {
  const {
    openModal,
    init,
    handleCancelAction,
    handleDeleteItem,
    active,
    refImg,
    inputImgRef,
    handleChangeImg,
    handleOpenInputImg,
    setOpenModal,
    dispatch,
    setInit,
    initState,
    listMemberships,
  } = usePromo(modal)

  return (
    <Modal openModal={openModal}>
      <div className="flex flex-col justify-center items-center ">
        <p className="text-center text-xl my-5 pb-5">
          {active ? `Detalle promoción existente` : 'Nueva promocion'}
        </p>

        <Formik
          initialValues={init}
          onSubmit={(val) => {
            const { from, until, dynamic, ...rest } = val
            const data = {
              from: moment(from).unix(),
              until: moment(until).unix(),
              dynamic,
              ...rest,
            }
            if (!dynamic) {
              delete data.informationApi
            }

            if (active) {
              dispatch(startEditPromo(val))
            } else {
              dispatch(startAddNewPromo(val))
            }

            setOpenModal(false)
            setInit(initState)
          }}
          validationSchema={PromoAdminValidation}
          enableReinitialize
        >
          {({ setFieldValue, values }) => (
            <Form className="flex flex-col w-full">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col md:w-1/2">
                  <label className="my-3">
                    <span>Arte</span>
                    <div
                      onClick={handleOpenInputImg}
                      className="w-[120px] h-[75px] rounded-lg border border-primary flex justify-center items-center cursor-pointer"
                    >
                      <img
                        ref={refImg}
                        src={
                          values.img
                            ? `${process.env.BACKEND}/${values.img}`
                            : NoFoundImg
                        }
                        alt=""
                        className="w-full h-full rounded-lg object-cover block"
                      />
                    </div>
                  </label>

                  <InputForm
                    name="title"
                    text="Titulo"
                    placeholder="Ingrese el titulo"
                    className="input-sm"
                    tabIndex={-1}
                  />

                  <div className="flex gap-3">
                    <InputForm
                      name="from"
                      text="Desde"
                      type="Date"
                      className="input-sm"
                      tabIndex={-1}
                      min={moment(new Date()).format('yyyy-MM-DD')}
                    />

                    <InputForm
                      name="until"
                      text="Hasta"
                      type="Date"
                      className="input-sm"
                      tabIndex={-1}
                    />
                  </div>

                  {/* <div className="form-control mt-4">
                    <label className="label cursor-pointer flex justify-start gap-3">
                      <span className="label-text">Promoción dinámica?</span>
                      <Field
                        type="checkbox"
                        className="toggle toggle-primary"
                        name="dynamic"
                        tabIndex={-1}
                      />
                    </label>
                  </div> */}

                  {/* <div>
                    {values.dynamic && (
                      <ApiServiceField
                        values={values}
                        errors={errors}
                        providers={listProviders}
                      />
                    )}
                  </div> */}
                </div>
                <div className="flex flex-col md:w-1/2">
                  <InputForm
                    name="description"
                    text="Descripcion"
                    as="textarea"
                    placeholder="Descripcion"
                    className="textarea textarea-primary h-[120px]"
                  />

                  <InputForm
                    name="policies"
                    text="Terminos y condiciones"
                    as="textarea"
                    placeholder="Condiciones"
                    className="textarea textarea-primary h-[120px]"
                  />

                  <InputForm
                    name="membership"
                    text="Válido para"
                    as="select"
                    className="input-sm"
                  >
                    <option value="">Seleccione uno</option>
                    <option value="all">Todos los usuarios</option>
                    {listMemberships?.map((item, i) => (
                      <option key={i} value={item.id}>
                        {item.name?.toLocaleLowerCase() === 's/n'
                          ? 'Sin membresías'
                          : item.name}
                      </option>
                    ))}
                  </InputForm>
                </div>
              </div>

              <div
                className={`flex flex-col mt-5 justify-between gap-4 md:flex-row md:pr-4 ${
                  active && 'md:flex-wrap'
                }`}
              >
                <button
                  type="button"
                  className="btn btn-base md:w-1/2"
                  onClick={handleCancelAction}
                  tabIndex={-1}
                >
                  Cancelar
                </button>

                {active && (
                  <button
                    type="button"
                    className="btn btn-base md:flex-1 bg-red-500 border-0 gap-3"
                    onClick={() => handleDeleteItem(active)}
                    tabIndex={-1}
                  >
                    <i className="fa-solid fa-trash text-sm" />
                    Eliminar
                  </button>
                )}

                {!active ? (
                  <button
                    type="submit"
                    className="btn btn-primary btn-base md:w-1/2 gap-3"
                    tabIndex={-1}
                  >
                    <i className="fa-solid fa-pencil text-sm" />
                    Crear
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary btn-base md:w-1/2 gap-3"
                    tabIndex={-1}
                  >
                    <i className="fa-solid fa-pencil text-sm" />
                    Modificar
                  </button>
                )}
              </div>

              <input
                title="Seleccionar imagen"
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

      <ModalSearchHotelPromo />
    </Modal>
  )
}
