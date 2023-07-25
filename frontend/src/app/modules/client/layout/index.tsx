import { ClientNavbar } from '@client/components'
import { ComponentLoader, Footer } from '@utils/components'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Redux } from '@redux/interfaces/redux'

export const ClientLayout = () => {
  const { state } = useSelector((i: Redux) => i.client.payment)
  return (
    <div className="bg-gradient-body animate__animated animate__fadeIn">
      <ClientNavbar />

      <div className="min-h-[100vh]">
        <Outlet />
        <div>
          {state === 'checkout' && (
            <div className="fixed bottom-0 left-0 right-0 top-0 m-auto bg-[#000000ce] z-40 grid place-content-center">
              <div className="flex flex-col max-w-[400px] gap-2 justify-center items-center">
                <span className="text-white block text-center text-xl">
                  Se encuentra en un proceso de pago
                </span>
                <strong className="cursor-pointer text-primary block text-center">
                  Sera redireccionado en un momento
                </strong>
                <small className="text-white block text-center">
                  O recargue la pagina para cancelar el pago
                </small>
                <ComponentLoader bg="bg-primary" />
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
