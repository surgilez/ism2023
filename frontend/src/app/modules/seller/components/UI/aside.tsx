import { Logout } from '@utils/components'
import { NavLink } from 'react-router-dom'

export const SellerAsideNavigation = () => (
  <nav className="flex flex-col navAside bg-[#001E36] w-[250px]">
    <ul className="text-white">
      <li>
        <NavLink
          to="/seller/"
          className={({ isActive }) => (isActive ? 'navActive' : '')}
        >
          <span>Cotizador</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/seller/promo"
          className={({ isActive }) => (isActive ? 'navActive' : '')}
        >
          <span>Promociones</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/seller/chat"
          className={({ isActive }) => (isActive ? 'navActive' : '')}
        >
          <span>Chat</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/seller/clients"
          className={({ isActive }) => (isActive ? 'navActive' : '')}
        >
          <span>Clientes</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/seller/reports"
          className={({ isActive }) => (isActive ? 'navActive' : '')}
        >
          <span>Reporte de ventas</span>
        </NavLink>
      </li>
      <li className="cursor-pointer">
        <Logout>
          <span>Cerrar sesión</span>
        </Logout>
      </li>
    </ul>
  </nav>
)
