import NoFoundImg from '@assets/404.jpg'
import { activePromo, activeChatAction } from '@redux/actions'
import { PromoAdmin } from '@admin/modules/promotions/interfaces'
import { Redux } from '@redux/interfaces/redux'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const ListPromotions = () => {
  const {
    admin: {
      promo: { list },
    },
    user: { sellerId },
    chat: { usersFilter },
  } = useSelector((i: Redux) => i)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAddPromo = (promo: PromoAdmin) => {
    const seller = usersFilter?.find(
      ({ account }) => account.id === String(sellerId)
    )

    if (seller) {
      if (!seller.person.allowChat || !seller.account.state) {
        Swal.fire({
          title: 'Oops!',
          text: 'El vendedor asignado no se encuentra activo, por favor contáctanos en el siguiente enlace',
          icon: 'warning',
          showConfirmButton: false,
        })

        Swal.fire({
          title: 'Oops!',
          text: 'El vendedor asignado no se encuentra activo, por favor contáctanos en el siguiente enlace!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Continuar a whatsApp?',
        }).then((result) => {
          if (result.isConfirmed) {
            window.open(
              `https://api.whatsapp.com/send?phone=${seller.person.phone}&text=Hola%20International%20Signature%20estoy%20interesado%20en%20tu%20promoción%20'${promo?.title}'`
            )
          }
        })
      } else {
        dispatch(activeChatAction(seller))
      }
    }
    dispatch(activePromo(promo))
    navigate('/client/chat')
  }

  return (
    <div className="h-[750px] overflow-y-auto ">
      <div className="flex flex-col gap-7 mx-5 ">
        {list?.map((promo, i) => {
          const { img, title, description } = promo
          return (
            <div key={i} className="card shadow-xl image-full w-full h-[350px]">
              <figure>
                <img
                  src={
                    (img as string)
                      ? `${process.env.BACKEND}/${img as string}`
                      : NoFoundImg
                  }
                  alt="banner"
                  className="w-full h-[350px] object-cover block"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-white text-3xl">{title}</h2>
                <div className="card-actions justify-end">
                  <div className=" w-full md:w-2/5 flex flex-col gap-4">
                    <div className="h-[200px] md:bg-base-100 rounded-xl shadow-xl md:text-black p-5 overflow-y-auto">
                      <span className="text-lg text-bold">
                        Detalle información
                      </span>

                      <div className="mt-3 md:text-gray-500">{description}</div>
                    </div>

                    <button
                      className="btn btn__gold btn_xs"
                      type="button"
                      onClick={() => handleAddPromo(promo)}
                    >
                      <i className="fa-solid fa-cart-plus mr-2" />
                      Preguntar por promoción
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
