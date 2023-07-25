import { Redux } from '@redux/interfaces/redux'
import { Avatar, Logout } from '@utils/components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const ClietNavigation = () => {
  const { img } = useSelector((i: Redux) => i.user)

  return (
    <div className="dropdown dropdown-end flex gap-3">
      <Avatar img={img} size={50}>
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-12 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link to="/client/profile">Perfil</Link>
          </li>
          <li>
            <Link to="/client/chat">Chat</Link>
          </li>

          <li>
            <Link to="/client/promo">Promociones</Link>
          </li>
          <li>
            <Link to="/client/shopping-cart">Carrito</Link>
          </li>
          <li>
            <Link to="/client/history-travel">Historial de viajes</Link>
          </li>
          <li>
            <Link to="/client/help">Ayuda</Link>
          </li>
          <li>
            <Logout>
              <span>Cerrar sesión</span>
            </Logout>
          </li>
        </ul>
      </Avatar>
    </div>
  )
}
