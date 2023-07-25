import { Modal } from '@utils/components/modal'
import { Dispatch, SetStateAction } from 'react'

interface IProps {
  openModal: boolean
  setOpenModalTermsAndConditions: Dispatch<SetStateAction<boolean>>
}

export const TermsAndConditions = ({
  openModal,
  setOpenModalTermsAndConditions,
}: IProps) => {
  return (
    <Modal openModal={openModal}>
      <div className="flex flex-col gap-4">
        <span className="text-2xl">Términos y condiciones</span>
        <hr />
        <br />
        <div className="max-h-[40vh] overflow-y-auto scroll_list_alternative text-justify pr-3">
          <ol className="flex flex-col gap-4 !list-decimal">
            <li>
              Algunos alojamientos dependiendo de la localidad pueden cobrar un
              “city tax” (pago directo al hotel).
            </li>
            <li>Esta reservación es NO CANCELABLE/REEMBOLSABLE.</li>
            <li>
              Los cambios y cancelaciones de sus reservas confirmadas, están
              sujetos a POLÍTICAS INTERNAS DE LOS HOTELES Y PROVEEDORES puede
              contactarse con nuestro departamento de atención al cliente para
              verificar las posibilidades de cambio.
            </li>
            <li>
              En caso de emergencias durante su estancia, podrá comunicarse con
              los números de atención al cliente que se encontrarán en el
              voucher de reserva.
            </li>
            <li>
              INTERNATIONAL SIGNATURE MEMBERS No se hace responsable por las
              condiciones de los Hoteles (se sugiere verificar comentarios,
              ubicación, comodidades de los hoteles, entre otros).
            </li>
            <li>
              INTERNATIONAL SIGNATURE MEMBERS, no se hace responsable por
              eventos climáticos ó de otra índole natural que afecten su estadía
              durante sus vacaciones.
            </li>
            <li>
              En caso de que usted encuentre una mejor tarifa, podremos aplicar
              la “Garantía de precio” contemplada en su contrato, previo una
              verificación del asesor.
            </li>
            <li>
              Para poder aplicar esto, será indispensable que el usuario NO
              confirme la reservación a traves de la pagina web.
            </li>
          </ol>
        </div>

        <button
          className="btn w-full md:w-[200px] self-end"
          onClick={() => setOpenModalTermsAndConditions(false)}
        >
          Cerrar
        </button>
      </div>
    </Modal>
  )
}
