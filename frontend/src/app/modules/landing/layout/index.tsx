import { LandingNavigation } from '@modules/landing/components'
import { Footer } from '@utils/components'
import { Outlet } from 'react-router-dom'

export const LandingLayout = () => (
  <>
    <LandingNavigation />
    <Outlet />
    <Footer />
  </>
)
