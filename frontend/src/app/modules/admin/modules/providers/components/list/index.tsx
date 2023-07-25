import { activeProvider } from '@redux/actions'
import { Redux } from '@redux/interfaces/redux'
import { ComponentLoader } from '@utils/components'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { usePromiseTracker } from 'react-promise-tracker'
import { IProvider } from '../../interfaces'
import { ActiveServices } from './services'

export const ListProviders = () => {
  const { list } = useSelector((i: Redux) => i.provider)
  const dispatch = useDispatch()
  const [openServiceModal, setOpenServiceModal] = useState(false)

  const handleShowServices = (prov: IProvider) => {
    if (prov.services.length <= 0) {
      Swal.fire(
        'Servicios no activos',
        'No existen servicios configurados',
        'info'
      )
    } else {
      dispatch(activeProvider({ active: prov, action: 'showServices' }))
      setOpenServiceModal(true)
    }
  }

  const handleEditService = (prov: IProvider) => {
    dispatch(activeProvider({ active: prov, action: 'edit' }))
  }

  if (!list) return <div />

  const { promiseInProgress } = usePromiseTracker({ area: 'providerList' })
  return (
    <div>
      {promiseInProgress ? (
        <div className="min-h-[60vh] grid place-content-center">
          <ComponentLoader />
        </div>
      ) : (
        <div
          className={`max-h-[600px] mt-10 overflow-auto scroll_list ${
            !promiseInProgress && 'bg-gradient-banner'
          }`}
        >
          <div>
            {list.length > 0 ? (
              <div className="table-container">
                <table className="table text-white ">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Nombre de contacto</th>
                      <th>Teléfono</th>
                      <th>País</th>
                      <th>Estado</th>
                      <th className="text-center">Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((prov, i) => (
                      <tr key={i}>
                        <td>{prov.name}</td>
                        <td>{prov.contact || 'N/A'}</td>
                        <td>{prov.phone || 'N/A'}</td>
                        <td>{prov.country || 'N/A'}</td>
                        <td>{prov.state ? 'Habilitado' : 'Inhabilitado'}</td>
                        <td className="text-center">
                          <div className="tooltip" data-tip="editar">
                            <button
                              title="edit"
                              type="button"
                              className="btn btn-xs btn-ghost btn-circle"
                            >
                              <i
                                className="fa-solid fa-pen-to-square"
                                onClick={() => handleEditService(prov)}
                              />
                            </button>
                          </div>
                          <div className="tooltip" data-tip="servicios activos">
                            <button
                              title="show"
                              type="button"
                              className="btn btn-xs btn-ghost btn-circle"
                            >
                              <i
                                className="fa-solid fa-gear"
                                onClick={() => handleShowServices(prov)}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="min-h-[60vh] grid place-content-center">
                <span className="block text-lg text-center text-white">
                  {' '}
                  No existen proveedores registrados
                </span>
              </div>
            )}
          </div>
          <ActiveServices
            openModal={openServiceModal}
            setOpenModal={setOpenServiceModal}
          />
        </div>
      )}
    </div>
  )
}
