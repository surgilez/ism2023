import { activeProvider } from '@redux/actions'
import { Redux } from '@redux/interfaces/redux'
import { Modal } from '@utils/components'
import { Dispatch } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface IProps {
  openModal: boolean
  setOpenModal: Dispatch<React.SetStateAction<boolean>>
}

export const ActiveServices = ({ openModal, setOpenModal }: IProps) => {
  const { active } = useSelector((i: Redux) => i.provider)
  const dispatch = useDispatch()

  const handleCloseModal = () => {
    setOpenModal(false)
    dispatch(activeProvider(undefined))
  }

  return (
    <div>
      {active?.active && active.active?.services.length >= 1 && (
        <Modal openModal={openModal}>
          <table className="table border w-full">
            <thead>
              <tr>
                <td>Servicio</td>
                <td>Estado</td>
                <td>Ganancia</td>
              </tr>
            </thead>
            <tbody>
              {active.active.services.map(({ name, state, profit }, i) => (
                <tr key={i}>
                  <td>{name}</td>
                  <td>{state ? 'Habilitado' : 'Deshabilitado'}</td>
                  <td>{`${profit} %` || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mt-8">
            <button type="button" className="btn" onClick={handleCloseModal}>
              Cerrar
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
