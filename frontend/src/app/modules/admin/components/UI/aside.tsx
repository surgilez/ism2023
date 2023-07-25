import { NavLink } from 'react-router-dom'

export const AdminAsideNavigation = () => (
  <nav className="flex flex-col navAside">
    <ul>
      <li>
        <NavLink
          to="/admin/membership"
          className={({ isActive }) => (isActive ? 'navActive' : '')}
        >
          <span>Membresías</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/seller"
          className={({ isActive }) => (isActive ? 'navActive' : '')}
        >
          <span>Vendedores</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/report"
          className={({ isActive }) => (isActive ? 'navActive' : '')}
        >
          <span>Reportes</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/promo"
          className={({ isActive }) => (isActive ? 'navActive' : '')}
        >
          <span>Promociones</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/providers"
          className={({ isActive }) => (isActive ? 'navActive' : '')}
        >
          <span>Proveedores</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/config"
          className={({ isActive }) => (isActive ? 'navActive' : '')}
        >
          <span>Configuración</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/chat"
          className={({ isActive }) => (isActive ? 'navActive' : '')}
        >
          <span>Chat</span>
        </NavLink>
      </li>
    </ul>
  </nav>
)
