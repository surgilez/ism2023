import moment from '@helpers/moment'
import { BookingCart } from '../interface'
import { Form, Formik } from 'formik'
import { ItemCart } from '../components/item'
import { Redux } from '@redux/interfaces/redux'
import { SkeletonCart } from '@utils/components/skeleton/cart'
import { startDeleteAllItemsShopping } from '@redux/actions/shopping'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const ShoppingCartComponent = () => {
  const {
    shopping: { shopping, total },
    auth: { uid },
    user: { rol },
    seller: {
      client: { clientActive },
    },
  } = useSelector((i: Redux) => i)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initState: BookingCart = {
    total: 0,
    cart: [],
  }

  const [init, setInit] = useState(initState)

  useEffect(() => {
    if (shopping) {
      setInit({
        total: 0,
        cart: shopping,
      })
    }
  }, [shopping, setInit])

  const promiseInProgress = false

  return (
    <div className="p-5 flex justify-center">
      <div className="w-full xl:w-[1200px] mt-8">
        <span className="font-medium text-xl text-white ">Carrito</span>

        <div className="my-10 ">
          {promiseInProgress ? (
            <SkeletonCart />
          ) : (
            <Formik
              initialValues={init}
              enableReinitialize
              onSubmit={(values) => {
                if (rol === 'seller') {
                  Swal.fire(
                    'Carrito generado completamente',
                    'El carrito ha sido generado en la cuenta del cliente para finalizar el proceso de pago',
                    'info'
                  )
                } else if (values) {
                  values.total = total || 0
                  navigate('/client/payment')
                }
              }}
            >
              {({ values }) => (
                <Form>
                  {shopping && shopping?.length > 0 ? (
                    <>
                      <div className="shopping mt-10">
                        <div className="container-info">
                          <div className="info w-full">
                            <small className="block date mb-5">
                              {moment(new Date()).format(
                                'DD [de] MMMM [del] yyyy'
                              )}
                            </small>
                            <span className="text-sm">
                              N° items seleccionados: {shopping?.length}
                            </span>
                            <span className="text-xl">
                              TOTAL A PAGAR:{' '}
                              <strong>USD {(total || 0).toFixed(2)}</strong>
                            </span>
                          </div>
                          <div className="flex flex-col sm:flex-row justify-between w-full gap-3 mt-5">
                            <button
                              type="button"
                              className="btn w-full sm:w-[48%] rounded-2xl shadow-xl flex gap-3 bg-red-600"
                              onClick={() =>
                                dispatch(startDeleteAllItemsShopping())
                              }
                            >
                              <i className="fa-solid fa-trash" />
                              <span>vaciar carrito</span>
                            </button>
                            <button
                              type="submit"
                              className="btn w-full sm:w-[48%] rounded-2xl flex gap-3 btn__gold"
                            >
                              <i className="fa-solid fa-cart-shopping" />
                              <span>reservar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <ItemCart
                        values={values}
                        rol={rol}
                        uid={uid}
                        clientActive={clientActive}
                      />
                    </>
                  ) : (
                    <div className="min-h-[70vh] grid place-content-center">
                      <span className="text-xl text-gray-200">
                        No existen artículos en el carrito
                      </span>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  )
}
