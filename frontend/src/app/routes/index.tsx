import { Suspense, lazy, useEffect, LazyExoticComponent } from 'react'
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom'
import { PrivateRoute, PublicRoute } from '@routes/types'
import { useDispatch, useSelector } from 'react-redux'
import { Redux } from '@redux/interfaces/redux'
import { logout, startChecking } from '@redux/actions'
import Swal from 'sweetalert2'
import { usePromiseTracker } from 'react-promise-tracker'
import { SuspenseLoader } from '@utils/components'
import { animateScroll as scroll } from 'react-scroll'
import { useLibrary } from '@utils/hooks/useLibrary'

const AdminRoutes = lazy(() => import('@admin/routes'))
const SellerLayout = lazy(() => import('@seller/routes'))
const ClientRoutes = lazy(() => import('@client/routes'))
const LandingRouting = lazy(() => import('@landing/routes'))

const AppRoutes = () => {
  const {
    auth: { checking },
    user: { rol },
  } = useSelector((i: Redux) => i)

  const dispatch = useDispatch()
  const { promiseInProgress } = usePromiseTracker({ area: 'login' })
  const { Jquery, PopperCheckout, FormPayment } = useLibrary()

  useEffect(() => {
    dispatch(startChecking())
  }, [dispatch, startChecking])

  useEffect(() => {
    scroll.scrollToTop()
  }, [])

  useEffect(() => {
    Jquery()
  }, [Jquery])

  useEffect(() => {
    PopperCheckout()
  }, [PopperCheckout])

  useEffect(() => {
    FormPayment()
  }, [FormPayment])

  let path = ''
  let Element:
    | LazyExoticComponent<() => JSX.Element>
    | (() => JSX.Element)
    | null = null

  switch (rol) {
    case 'admin':
      path = `${rol}/membership`
      Element = AdminRoutes
      break
    case 'seller':
      path = `${rol}/`
      Element = SellerLayout
      break
    case 'client':
      path = rol
      Element = ClientRoutes
      break

    default:
      if (rol) {
        Swal.fire(
          'Error crítico',
          'El rol del usuario no se encuentra configurado, por favor contacta al administrador del sistema',
          'error'
        )
        dispatch(logout())
      }
  }

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <HashRouter>
        {promiseInProgress || checking ? (
          <SuspenseLoader />
        ) : (
          <Routes>
            <Route element={<Outlet />}>
              <Route
                path="/*"
                element={
                  <PublicRoute path={path}>
                    <LandingRouting />
                  </PublicRoute>
                }
              />
              <Route
                path={`${rol}/*`}
                element={<PrivateRoute Element={Element} />}
              />
            </Route>
          </Routes>
        )}
      </HashRouter>
    </Suspense>
  )
}

export default AppRoutes
