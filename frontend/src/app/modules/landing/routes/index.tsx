import { Route, Routes, Navigate } from 'react-router-dom'
import {
  HomeScreen,
  AboutScreen,
  ContactScreen,
  ForgotPasswordScreen,
  RecoverPassword,
} from '@landing/pages'
import { LandingLayout } from '../layout'

export const LandingRouting = () => (
  <Routes>
    <Route element={<LandingLayout />}>
      <Route index element={<HomeScreen />} />
      <Route path="forgot-password" element={<ForgotPasswordScreen />} />
      <Route path="recover-password" element={<RecoverPassword />} />
      <Route path="about" element={<AboutScreen />} />
      <Route path="contacts" element={<ContactScreen />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  </Routes>
)

export default LandingRouting
