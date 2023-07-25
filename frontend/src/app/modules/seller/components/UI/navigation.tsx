import Logo from '@assets/logo.png'
import { Redux } from '@redux/interfaces/redux'
import { Avatar } from '@utils/components/avatar'
import { Logout } from '@utils/components/logout'
import { NameChat } from '@utils/pipes'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export const SellerNavigation = () => {
  const {
    user: { img, name, lastName },
    seller: { client },
    shopping: { shopping },
  } = useSelector((i: Redux) => i)

  const navigate = useNavigate()

  return (
    <div className="navbar bg-base-100 p-5 xl:px-32">
      <div className="flex-1">
        <Link to="/" className=" normal-case text-xl landing__logo ml-5">
          <img src={Logo} alt="logo" />
        </Link>

        <span className="self-end hidden xl:block font-bold">
          Hola, {NameChat(name, lastName)}
        </span>
      </div>
      <div className="flex-none">
        <div className="flex gap-4">
          {client.clientActive && (
            <div className="flex gap-1 bg-base-200 rounded-xl px-3 items-center">
              <span className="text-sm">{client.clientActive.name}</span>
              <button
                title="cart"
                type="button"
                className="btn btn-ghost btn-circle"
                onClick={() => navigate('/seller/shopping-cart')}
              >
                <div className="indicator">
                  <i className="fa-solid fa-cart-shopping  text-xl" />
                  <span className="badge badge-sm badge-warning indicator-item">
                    {shopping?.length || 0}
                  </span>
                </div>
              </button>
            </div>
          )}
          <div className="dropdown dropdown-end flex ">
            <Avatar img={img}>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-12 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/seller/profile">Perfil</Link>
                </li>
                <ul className="xl:hidden">
                  <li>
                    <Link to="/seller/">Cotizador</Link>
                  </li>
                  <li>
                    <Link to="/seller/promo">Promociones</Link>
                  </li>
                  <li>
                    <Link to="/seller/chat">Chat</Link>
                  </li>
                  <li>
                    <Link to="/seller/clients">Clientes</Link>
                  </li>
                  <li>
                    <Link to="/seller/reports">Reporte de ventas</Link>
                  </li>
                </ul>
                <li>
                  <Logout>
                    <span>Cerrar sesion</span>
                  </Logout>
                </li>
              </ul>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  )
}
