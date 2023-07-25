import { Redux } from '@redux/interfaces/redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const ShoppingCart = () => {
  const { shopping } = useSelector((i: Redux) => i.shopping)
  const navigation = useNavigate()

  return (
    <div className="tooltip tooltip-bottom" data-tip="Carrito">
      <div className="dropdown dropdown-end mr-3">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <div className="indicator">
            <i className="fa-solid fa-cart-shopping text-xl" />
            {shopping && shopping?.length > 0 && (
              <span className="badge badge-sm indicator-item">
                {shopping.length}
              </span>
            )}
          </div>
        </label>
        <div
          tabIndex={0}
          className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
        >
          <div className="card-body">
            <span className="font-bold text-lg">
              {shopping && shopping.length > 0
                ? `${
                    shopping?.length === 1
                      ? `${shopping?.length} articulo`
                      : `${shopping?.length} artículos`
                  }`
                : 'No existen artículos'}
            </span>
            <div className="card-actions">
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={() => navigation('/client/shopping-cart')}
              >
                Ver carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
