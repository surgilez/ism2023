import { startGetAdminReports, startSearchSalesReports } from '@redux/actions'
import { Redux } from '@redux/interfaces/redux'
import { InputForm } from '@utils/components'
import { Formik, Form } from 'formik'
import { useSelector, useDispatch } from 'react-redux'

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

type Report = 'sales' | 'membership'

export const SearchReport = ({ type }: { type: Report }) => {
  const { list: listMembership } = useSelector((i: Redux) => i.admin.membership)
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

  const promiseInProgress = false

  return (
    <div>
      <Formik
        initialValues={initState}
        onSubmit={(val, { resetForm }) => {
          if (type === 'membership') {
            delete val.numMembership
          } else {
            delete val.name
          }
          resetForm()

          dispatch(startSearchSalesReports(val))
        }}
      >
        {({ values }) => (
          <Form
            className="w-full flex flex-col md:flex-row md:flex-wrap gap-4 items-center"
            noValidate
          >
            <div className="w-full flex flex-col md:flex-row gap-4">
              <InputForm
                name="filter"
                text="Filtrar por:"
                as="select"
                className="select-sm"
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
                    placeholder="Fecha Inicio"
                    className="input-sm"
                    disabled={promiseInProgress}
                  />

                  <InputForm
                    name="endDate"
                    type="date"
                    text="Fecha Fin"
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
                  placeholder="Ingrese los nombres"
                  className="input-sm"
                  disabled={promiseInProgress}
                />
              )}
              {values.filter === '4' && (
                <InputForm
                  name="doc"
                  text="Documento"
                  placeholder="Ingrese documento"
                  className="input-sm"
                  disabled={promiseInProgress}
                />
              )}

              {values.filter === '6' && (
                <InputForm
                  name="email"
                  text="Correo"
                  placeholder="Ingrese correo"
                  className="input-sm"
                  disabled={promiseInProgress}
                />
              )}

              <button
                type="submit"
                disabled={promiseInProgress}
                className="btn btn-sm bg-blue-900 gap-3 w-full md:w-[150px] mt-7 text-white "
              >
                <i className="fa-solid fa-magnifying-glass text-lg " />
                <span className="font-bold">Buscar</span>
              </button>
              <button
                type="button"
                disabled={promiseInProgress}
                onClick={() => {
                  dispatch(startGetAdminReports())
                }}
                className="btn btn-sm bg-blue-900 gap-3 w-full md:w-[150px] mt-7 text-white "
              >
                <i className="fa-solid fa-rotate text-lg " />
                <span className="font-bold">Recargar</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
