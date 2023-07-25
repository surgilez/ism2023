import { Modal } from '@utils/components/modal'
import { Sales } from '@admin/modules/reports/interfaces'
import { Dispatch } from 'react'

interface IProps {
  isOpen: boolean
  sales: Sales[]
  setModalSale: Dispatch<
    React.SetStateAction<{
      isOpen: boolean
      sales: Sales[]
    }>
  >
}

export const ModalSales = ({ isOpen, sales, setModalSale }: IProps) => {
  return (
    <Modal openModal={isOpen}>
      <div className="flex flex-col items-end ">
        <table className="table w-full  min-h-[300px] overflow-auto">
          <thead>
            <tr>
              <th>Detalle</th>
              <th>Estado</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {sales?.map(({ detail, price, err }, i) => (
              <tr key={i}>
                <td>{detail}</td>
                <td>{err}</td>
                <td>$ {Number(price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => setModalSale((val) => ({ ...val, isOpen: false }))}
          className="btn btn-sm px-7 text-white p-2 cursor-pointer rounded-lg w-[200px] mt-5"
        >
          Cerrar
        </button>
      </div>
    </Modal>
  )
}
