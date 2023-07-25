import Logo from '@assets/logo.png'
import { Redux } from '@redux/interfaces/redux'
import { Avatar } from '@utils/components/avatar'
import { Logout } from '@utils/components/logout'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const AdminNavigation = () => {
  const { img } = useSelector((i: Redux) => i.user)

  return (
    <div className="navbar bg-base-100 p-5 xl:px-32">
      <div className="flex-1">
        <Link to="/" className=" normal-case text-xl landing__logo ml-5">
          <img src={Logo} alt="logo" />
        </Link>

        <span className="self-end hidden xl:block text font-bold">
          Panel administrativo ISM
        </span>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end flex ">
          <Avatar img={img}>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-12 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/admin/profile">Perfil</Link>
              </li>
              <div className="xl:hidden">
                <li>
                  <Link to="/admin/membership">Membresías</Link>
                </li>
                <li>
                  <Link to="/admin/seller">Vendedores</Link>
                </li>
                <li>
                  <Link to="/admin/report">Reportes</Link>
                </li>
                <li>
                  <Link to="/admin/promo">Promociones</Link>
                </li>
                <li>
                  <Link to="/admin/providers">Proveedores</Link>
                </li>
                <li>
                  <Link to="/admin/config">Configuración</Link>
                </li>
                <li>
                  <Link to="/admin/chat">Chat</Link>
                </li>
              </div>
              <li>
                <Logout>
                  <span>Cerrar sesión</span>
                </Logout>
              </li>
            </ul>
          </Avatar>
        </div>
      </div>
    </div>
  )
}
