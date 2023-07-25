import { BookingCart } from '../interface'
import { Cart } from './cart'
import { FieldArray } from 'formik'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { UtilRatehawkState } from '@api/ratehawk/interface/util'
import { setTotalShoppingAction } from '@redux/actions/shopping'
import { Client } from '@utils/interfaces'
import { Role } from '@redux/interfaces/user'

interface IProps {
  values: BookingCart
  util?: UtilRatehawkState
  clientActive?: Client
  uid?: string
  rol?: Role
}

export const ItemCart = ({ values, uid, rol, clientActive }: IProps) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const total = values.cart.reduce((acc, val) => acc + val.total, 0)

    dispatch(setTotalShoppingAction(total))
  }, [values, dispatch])

  return (
    <FieldArray
      name="cart"
      render={() => (
        <div>
          {values.cart &&
            values.cart.length > 0 &&
            values.cart.map(
              (cart, index) =>
                cart && (
                  <Cart
                    key={index}
                    cart={cart}
                    index={index}
                    uid={uid}
                    rol={rol}
                    clientActive={clientActive}
                  />
                )
            )}
        </div>
      )}
    />
  )
}
