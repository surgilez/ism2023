import { Routes, Route } from 'react-router-dom'
import {
  QuoterLayout,
  PromotionsLayout,
  ClientLayout,
  ReportsLayout,
} from '@seller/modules'
import { ProfileScreen, SuspenseLoader } from '@utils/components'
import { useDispatch } from 'react-redux'
import { ChatRoutes } from '@chat/router'
import { usePromiseTracker } from 'react-promise-tracker'
import { useEffect } from 'react'
import { startGetServices } from '@api/redux/actions/service'
import { SellerLayout } from '../layout'
import { ShoppingCartComponent } from '@modules/shopping/layout'
import {
  startGetAllUsers,
  startGetMembership,
  startGetMembershipReports,
  startGetPromo,
} from '@redux/actions'

export const SellerRoutes = () => {
  const { promiseInProgress } = usePromiseTracker({ area: 'logout' })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetServices())
  }, [dispatch])

  // useEffect(() => {
  //   dispatch(startGetClientSeller())
  // }, [dispatch])

  useEffect(() => {
    dispatch(startGetPromo())
  }, [dispatch])

  useEffect(() => {
    dispatch(startGetAllUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(startGetMembershipReports())
  }, [dispatch])

  useEffect(() => {
    dispatch(startGetMembership())
  }, [])

  return (
    <div>
      {promiseInProgress ? (
        <SuspenseLoader />
      ) : (
        <Routes>
          <Route element={<SellerLayout />}>
            <Route index element={<QuoterLayout />} />
            <Route path="profile" element={<ProfileScreen />} />
            <Route path="promo" element={<PromotionsLayout />} />
            <Route path="clients" element={<ClientLayout />} />
            <Route path="reports" element={<ReportsLayout />} />
            <Route path="shopping-cart" element={<ShoppingCartComponent />} />
            <Route path="chat/*" element={<ChatRoutes />} />
          </Route>
          <Route path="*" element={<>Estas perdido</>} />
        </Routes>
      )}
    </div>
  )
}
export default SellerRoutes
