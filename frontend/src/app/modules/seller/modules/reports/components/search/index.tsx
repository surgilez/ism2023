import { Redux } from '@redux/interfaces/redux'
import { InputForm } from '@utils/components'
import { Formik, Form } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  startGetMembershipReports,
  startSearchSalesReports,
} from '@redux/actions'

interface IProps {
  filter?: string
  startDate?: string | Date
  endDate?: string | Date
  membership?: string
  doc?: string
  name?: string
  numMembership?: string
  email?: string
  typeSort?: string
}

export const SearchReportSeller = () => {
  const {
    user: { commission },
    admin: {
      reports: { membershipList },
      membership: { list: listMembership },
    },
  } = useSelector((i: Redux) => i)
  const [commissionProfit, setCommissionProfit] = useState(0)

  const initState: IProps = {
    name: '',
    filter: '',
    doc: '',
    startDate: '',
    endDate: '',
    membership: '',
    numMembership: '',
    email: '',
    typeSort: '',
  }

  const dispatch = useDispatch()

  useEffect(() => {
    // setCommissionProfit(5)
    if (membershipList && membershipList.length > 0 && commission) {
      membershipList.forEach((membership) => {
        const { salesCurrenMont } = membership

        if (salesCurrenMont && salesCurrenMont.length > 0) {
          const total = salesCurrenMont.reduce((a, b) => a + Number(b.price), 0)
          const profit = (commission * total) / 100

          setCommissionProfit(profit)
        }
      })
    }
  }, [commission, setCommissionProfit, membershipList])

  const promiseInProgress = false

  return (
    <div className="flex flex-col md:flex-row justify-end md:justify-between gap-3">
      <div className="w-full md:w-1/2">
        <Formik
          initialValues={initState}
          onSubmit={(val, { resetForm }) => {
            dispatch(startSearchSalesReports(val))
            resetForm()
          }}
        >
          {({ values }) => (
            <Form noValidate>
              <div className="w-full md:w-[450px] 2xl:w-[500px] flex flex-col gap-4">
                <div className="w-full flex flex-col md:flex-row gap-4">
                  <InputForm
                    name="filter"
                    text="Filtrar por:"
                    textLabelClassName="text-white"
                    as="select"
                    className="select-sm w-full"
                    disabled={promiseInProgress}
                  >
                    <option value="">Seleccione filtro</option>
                    <option value="1">alfabético</option>
                    <option value="2">Fecha</option>
                    <option value="3">Membresía</option>
                    <option value="4">Documento</option>
                    <option value="5">Nombre</option>
                    <option value="6">Correo</option>
                  </InputForm>

                  {values.filter === '1' && (
                    <InputForm
                      name="typeSort"
                      as="select"
                      text="Ordenar por:"
                      textLabelClassName="text-white"
                      className="select-sm"
                      disabled={promiseInProgress}
                    >
                      <option value="" disabled>
                        Seleccione uno
                      </option>
                      <option value="ASC">Ascendente</option>
                      <option value="DESC">Descendente</option>
                    </InputForm>
                  )}

                  {values.filter === '2' && (
                    <>
                      <InputForm
                        name="startDate"
                        type="date"
                        text="Fecha inicio"
                        textLabelClassName="text-white"
                        placeholder="Fecha Inicio"
                        className="input-sm"
                        disabled={promiseInProgress}
                      />

                      <InputForm
                        name="endDate"
                        type="date"
                        text="Fecha Fin"
                        textLabelClassName="text-white"
                        placeholder="Fecha Fin"
                        className="input-sm"
                        disabled={promiseInProgress}
                      />
                    </>
                  )}

                  {values.filter === '3' && (
                    <InputForm
                      name="membership"
                      as="select"
                      text="Membresía"
                      textLabelClassName="text-white"
                      className="select-sm"
                      disabled={promiseInProgress}
                    >
                      <option value="" disabled>
                        Seleccione una opción
                      </option>
                      {listMembership &&
                        listMembership.length > 0 &&
                        listMembership.map(
                          (item, i) =>
                            item.name !== 'S/N' && (
                              <option key={i} value={item.id}>
                                {item.name}
                              </option>
                            )
                        )}
                    </InputForm>
                  )}

                  {values.filter === '5' && (
                    <InputForm
                      name="name"
                      text="Nombres"
                      textLabelClassName="text-white"
                      placeholder="Ingrese los nombres"
                      className="input-sm"
                      disabled={promiseInProgress}
                    />
                  )}
                  {values.filter === '4' && (
                    <InputForm
                      name="doc"
                      text="Documento"
                      textLabelClassName="text-white"
                      placeholder="Ingrese documento"
                      className="input-sm"
                      disabled={promiseInProgress}
                    />
                  )}

                  {values.filter === '6' && (
                    <InputForm
                      name="email"
                      text="Correo"
                      textLabelClassName="text-white"
                      placeholder="Ingrese correo"
                      className="input-sm"
                      disabled={promiseInProgress}
                    />
                  )}
                </div>

                {values.filter && (
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={promiseInProgress}
                      className="btn btn-sm bg-blue-900 gap-3 w-[48%] mt-7 text-white "
                    >
                      <i className="fa-solid fa-magnifying-glass text-lg " />
                      <span className="font-bold">Buscar</span>
                    </button>
                    <button
                      type="button"
                      disabled={promiseInProgress}
                      onClick={() => {
                        dispatch(startGetMembershipReports())
                      }}
                      className="btn btn-sm gap-3 w-[48%] mt-7 text-white "
                    >
                      <i className="fa-solid fa-rotate text-lg " />
                      <span className="font-bold">Recargar</span>
                    </button>
                  </div>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="text-white flex flex-col items-center">
        <span className="rounded-2xl px-3 py-1 bg-gray-400 font-bold ">
          Total de comisión $ {commissionProfit.toFixed(2)}
        </span>
        <small>Mes actual</small>
      </div>
    </div>
  )
}
