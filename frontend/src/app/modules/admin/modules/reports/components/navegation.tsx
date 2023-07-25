import { Link, useLocation } from 'react-router-dom'

export const ReportNavigation = () => {
  const { pathname } = useLocation()

  return (
    <ul className="flex gap-3 my-2">
      <li>
        <Link
          to="/admin/report"
          className={`btn btn-ghost btn-sm px-7 border-2 border-gray-500 p-2 rounded-2xl ${
            pathname.endsWith('report') && 'subNavActive'
          }`}
        >
          Membresías
        </Link>
      </li>
      {/* <li>
        <Link
          to="/admin/report/sales"
          className={`btn btn-ghost btn-sm px-7 border-2 border-gray-500 p-2 rounded-2xl ${
            pathname.endsWith('sales') && 'subNavActive'
          }`}
        >
          Ventas
        </Link>
      </li> */}
    </ul>
  )
}
