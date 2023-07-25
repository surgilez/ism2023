import moment from '@helpers/moment'
import { Carousel } from 'react-responsive-carousel'
import { ShoppingCart } from '../interface'
import { useDispatch } from 'react-redux'
import { startDeleteItemShopping } from '@redux/actions/shopping'
import { Client } from '@utils/interfaces'
import { Role } from '@redux/interfaces/user'

interface IProps {
  cart: ShoppingCart
  index: number
  clientActive?: Client
  uid?: string
  rol?: Role
}

export const Cart = ({ cart, index, uid, rol, clientActive }: IProps) => {
  const dispatch = useDispatch()

  const deleteItem = (cart: ShoppingCart) => {
    dispatch(
      startDeleteItemShopping(
        cart,
        rol && rol === 'seller' ? String(clientActive?.id) : String(uid)
      )
    )
  }

  return (
    <div>
      <div className="flex gap-4 text-gray-400 items-center">
        <span className="font-bold">item num. {index + 1}</span>
        <button
          title="Delete item"
          type="button"
          className="btn btn-circle btn-md btn-ghost"
        >
          <i
            className="fa-solid fa-trash text-lg"
            onClick={() => deleteItem(cart)}
          />
        </button>
      </div>
      <div className="bg-[#56619F] mt-2 p-4 rounded-xl flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[350px] lg:w-[450px]">
          <Carousel
            emulateTouch
            showArrows={false}
            showThumbs={false}
            infiniteLoop
            showStatus={false}
          >
            {cart.img &&
              cart.img.map((imgData, j) => (
                <div key={j}>
                  <img
                    src={imgData.replace('{size}', 'x500')}
                    alt="hotel"
                    className="h-[240px] object-cover rounded-xl"
                  />
                </div>
              ))}
          </Carousel>
        </div>
        <div className="text-gray-200 text-sm gap-4 flex flex-col md:flex-row w-full justify-between">
          <div className="bg-[#003C6B] rounded-xl p-4 flex flex-col items-end md:order-2 h-fit">
            <span className="block">
              Precio: USD {cart.subtotal.toFixed(2)}
            </span>
            <span className="block">Impuestos: USD {cart.iva.toFixed(2)}</span>

            <span className="block">
              Ahorro x membresía: USD {cart.discount.toFixed(2)}
            </span>

            <span className="block font-bold text-accent">
              Total: USD {cart.total.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col md:order-1">
            <small className="block">
              {moment.unix(Number(cart.date)).format('DD [de] MMMM [del] yyyy')}
            </small>
            {cart.name && (
              <span className="text-lg font-bold block">
                Estancia {cart.name}
              </span>
            )}
            <span className="text-lg block">{cart.item_name}</span>
            <span className="text-md block">{cart.description}</span>
            <span className="text-md block">{cart.service.name}</span>
            <div className="mt-8">
              <span className="font-bold">
                Num. noches: <strong>{cart.night}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
