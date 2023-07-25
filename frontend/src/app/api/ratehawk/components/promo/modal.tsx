import { HotelListRatehawkPage } from '@api/ratehawk/pages'
import { setPromoOpenModal } from '@redux/actions'
import { Redux } from '@redux/interfaces/redux'
import { Modal } from '@utils/components'
import { useSelector, useDispatch } from 'react-redux'
import { HotelRatehawk } from '../search'

export const ModalSearchHotelPromo = () => {
  const dispatch = useDispatch()
  const {
    admin: {
      promo: { modal },
    },
  } = useSelector((i: Redux) => i)

  return (
    <Modal openModal={modal?.open}>
      <div className="relative">
        <div className="absolute w-full">
          <button
            title="hotel"
            type="button"
            className="btn btn-sm btn-circle absolute top-0 right-0"
            onClick={() => dispatch(setPromoOpenModal(false, 'cancel'))}
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <span className="block text-center text-xl mt-4 mb-8 font-bold">
          Buscar Hotel
        </span>
        <div className="mt-3">
          <HotelRatehawk isPromo={true} />
        </div>
        <div className="mt-8 bg-[#ececcc] rounded-xl p-3">
          <HotelListRatehawkPage isClientModule={false} isPromo />
        </div>
      </div>
    </Modal>
  )
}
