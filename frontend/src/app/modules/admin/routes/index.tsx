import { Routes, Route } from 'react-router-dom'
import {
  MembershipRoutes,
  SellersScreen,
  ReportsRoutes,
  PromotionsScreen,
  ProvidersLayout,
  AdminConfigLayout,
} from '@admin/modules'
import { ProfileScreen, SuspenseLoader } from '@utils/components'
import { ChatRoutes } from '@chat/router'
import { usePromiseTracker } from 'react-promise-tracker'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  startGetAdminReports,
  startGetAllUsers,
  startGetClient,
  startGetMembership,
  startGetPromo,
  startGetProviders,
  startGetSeller,
} from '@redux/actions'
import { AdminLayout } from '../layout'
import { Redux } from '@redux/interfaces/redux'
import { startGetServices } from '@api/redux/actions/service'
import { startGetConfigEmail } from '@redux/actions/admin/config'

export const AdminRoutes = () => {
  const { promiseInProgress } = usePromiseTracker({ area: 'logout' })
  const dispatch = useDispatch()

  const {
    admin: {
      seller: { list: listSeller },
      membership: { list: listMembership },
    },
    utils: { page, typePag },
  } = useSelector((i: Redux) => i)

  useEffect(() => {
    dispatch(startGetProviders())
  }, [dispatch])

  useEffect(() => {
    if (!listSeller?.accounts || listSeller.accounts.length <= 0) {
      dispatch(startGetSeller(1))
    }
  }, [dispatch, listSeller])

  useEffect(() => {
    dispatch(startGetClient(1))
  }, [dispatch])

  useEffect(() => {
    if (typePag && typePag === 'sellers') {
      dispatch(startGetSeller(page || 1))
    }
  }, [page, dispatch, typePag])

  useEffect(() => {
    if (typePag && typePag === 'clients') {
      dispatch(startGetClient(page || 1))
    }
  }, [page, dispatch, typePag])

  useEffect(() => {
    dispatch(startGetServices())
  }, [dispatch])

  useEffect(() => {
    dispatch(startGetPromo())
  }, [dispatch])

  useEffect(() => {
    if (!listMembership) dispatch(startGetMembership())
  }, [listMembership])

  useEffect(() => {
    dispatch(startGetAllUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(startGetAdminReports())
  }, [dispatch])

  useEffect(() => {
    dispatch(startGetConfigEmail())
  }, [])

  return (
    <div>
      {promiseInProgress ? (
        <SuspenseLoader />
      ) : (
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="profile" element={<ProfileScreen />} />
            <Route path="membership/*" element={<MembershipRoutes />} />
            <Route path="seller" element={<SellersScreen />} />
            <Route path="promo" element={<PromotionsScreen />} />
            <Route path="report/*" element={<ReportsRoutes />} />
            <Route path="providers" element={<ProvidersLayout />} />
            <Route path="config" element={<AdminConfigLayout />} />
            <Route path="chat/*" element={<ChatRoutes />} />
          </Route>
          <Route path="*" element={<>Estas perdido</>} />
        </Routes>
      )}
    </div>
  )
}

export default AdminRoutes
