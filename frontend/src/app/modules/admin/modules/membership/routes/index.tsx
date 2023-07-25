import { Routes, Route, Navigate } from 'react-router-dom'
import { MemberShipLayout } from '../layout'
import { MemberShipScreen, ClientsScreen } from '../pages'

export const MembershipRoutes = () => (
  <Routes>
    <Route element={<MemberShipLayout />}>
      <Route index element={<MemberShipScreen />} />
      <Route path="clients" element={<ClientsScreen />} />
      <Route path="*" element={<Navigate to="/admin/membership" />} />
    </Route>
  </Routes>
)

export default MembershipRoutes
