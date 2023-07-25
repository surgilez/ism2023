import { useEffect } from 'react'
import { useChecklist } from 'react-checklist'
import { useDispatch } from 'react-redux'
import { setResetClient, setSelectClients } from '@redux/actions'
import { Client } from '@utils/interfaces/admin/client'

interface IProps {
  promiseInProgress: boolean
  list?: Client[]
  selectReset?: boolean
}

export const TableClients = ({
  promiseInProgress,
  list,
  selectReset,
}: IProps) => {
  const dispatch = useDispatch()

  if (!list) return <div />

  const { handleCheck, isCheckedAll, checkedItems, setCheckedItems } =
    useChecklist(list, {
      key: 'id',
      keyType: 'string',
    })

  useEffect(() => {
    if (selectReset) {
      setCheckedItems(new Set())
      dispatch(setResetClient(false))
    }
  }, [selectReset, dispatch])

  useEffect(() => {
    dispatch(setSelectClients([...checkedItems] as string[]))
  }, [dispatch, checkedItems])

  return (
    <div
      className={`min-h-[65vh] overflow-auto scroll_list ${
        !promiseInProgress && 'bg-gradient-banner'
      }`}
    >
      <div className="table-container w-full">
        <table className="table text-white w-full">
          <thead>
            <tr>
              <th>
                <input
                  title="checkbox all"
                  type="checkbox"
                  onChange={handleCheck}
                  checked={isCheckedAll}
                  className="checkbox checkbox-sm checkbox-primary"
                />
              </th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Identificación</th>
              <th>Correo</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {list.map(({ id, name, lastName, doc, email, state }, i) => {
              return (
                <tr key={i}>
                  <td>
                    <input
                      title="checkbox item"
                      type="checkbox"
                      data-key={id}
                      onChange={handleCheck}
                      checked={checkedItems.has(id as string)}
                      className="checkbox checkbox-sm checkbox-primary"
                    />
                  </td>
                  <td>{name}</td>
                  <td>{lastName}</td>
                  <td>{doc}</td>
                  <td>{email}</td>
                  <td>{state ? 'Activo' : 'Suspendido'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
