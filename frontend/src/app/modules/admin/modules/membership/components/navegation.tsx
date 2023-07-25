import { Link, useLocation } from 'react-router-dom'

export const MembersNavigation = () => {
  const { pathname } = useLocation()

  return (
    <ul className="flex gap-3 my-2">
      <li>
        <Link
          to="/admin/membership"
          className={`btn btn-ghost btn-sm px-7 border-2 border-gray-500 p-2 rounded-2xl  ${
            pathname.endsWith('membership') && 'subNavActive'
          }`}
        >
          Membresías
        </Link>
      </li>
      <li>
        <Link
          to="/admin/membership/clients"
          className={`btn btn-ghost btn-sm px-7 border-2 border-gray-500 p-2 rounded-2xl ${
            pathname.endsWith('clients') && 'subNavActive'
          }`}
        >
          Clientes
        </Link>
      </li>
    </ul>
  )
}
