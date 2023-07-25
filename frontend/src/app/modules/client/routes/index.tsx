import { ChatRoutes } from '@chat/router'
import { ClientLayout } from '../layout'
import { HotelInfoRatehawk } from '@api/ratehawk/pages'
import { ProfileScreen, SuspenseLoader } from '@utils/components'
import { Redux } from '@redux/interfaces/redux'
import { Route, Routes } from 'react-router-dom'
import { ShoppingCartComponent } from '@shopping/layout'
import { startGetMembershipClient } from '@redux/actions/client/membership'
import { startGetAllUsers, startGetPromo } from '@redux/actions'
import { startGetServices } from '@api/redux/actions/service'
import { startGetShopping } from '@redux/actions/shopping'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { usePromiseTracker } from 'react-promise-tracker'
import {
  MainPageClient,
  PromoClient,
  Help,
  TravelHistory,
  Services,
  PaymentScreen,
  Checkout,
} from '@client/pages'

export const ClientRoutes = () => {
  const { promiseInProgress } = usePromiseTracker({ area: 'logout' })

  const { uid } = useSelector((i: Redux) => i.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetServices())
  }, [dispatch])

  useEffect(() => {
    dispatch(startGetMembershipClient())
  }, [dispatch])

  useEffect(() => {
    dispatch(startGetPromo())
  }, [dispatch])

  useEffect(() => {
    if (uid) {
      dispatch(startGetShopping(uid))
    }
  }, [dispatch, uid])

  // useEffect(() => {
  //   if (uid) dispatch(startGetClientSeller(uid))
  // }, [dispatch, uid])

  useEffect(() => {
    dispatch(startGetAllUsers())
  }, [dispatch])

  return (
    <div>
      {promiseInProgress ? (
        <SuspenseLoader />
      ) : (
        <Routes>
          <Route element={<ClientLayout />}>
            <Route index element={<MainPageClient />} />
            <Route path="profile" element={<ProfileScreen />} />
            <Route path="promo" element={<PromoClient />} />
            <Route path="services/:type" element={<Services />} />
            <Route path="service/hotel/1/:id" element={<HotelInfoRatehawk />} />
            <Route path="shopping-cart" element={<ShoppingCartComponent />} />
            <Route path="history-travel" element={<TravelHistory />} />
            <Route path="help" element={<Help />} />
            <Route path="payment" element={<PaymentScreen />} />
            <Route path="chat/*" element={<ChatRoutes />} />
          </Route>
          <Route path="checkout" element={<Checkout />} />
          <Route path="*" element={<>Estas perdido</>} />
        </Routes>
      )}
    </div>
  )
}

export default ClientRoutes
