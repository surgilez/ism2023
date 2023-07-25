import { Outlet } from 'react-router-dom'
import { AdminNavigation, AdminAsideNavigation } from '@admin/components'
import { Footer } from '@utils/components'

export const AdminLayout = () => (
  <div className="animate__animated animate__fadeIn">
    <AdminNavigation />
    <div className="xl:px-32 flex items-start body-screen pt-10 bg-gradient-body">
      <div className="hidden xl:block xl:min-w-[250px] rounded-xl p-5 bg-base-200 bg-gradient-banner">
        <AdminAsideNavigation />
      </div>
      <div className="w-full mx-4 xl:w-3/4 mb-10 md:mx-10">
        <Outlet />
      </div>
    </div>
    <Footer />
  </div>
)
