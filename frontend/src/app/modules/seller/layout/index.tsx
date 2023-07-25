import { Outlet } from 'react-router-dom'
import { SellerNavigation, SellerAsideNavigation } from '@seller/components'
import { Footer } from '@utils/components'

export const SellerLayout = () => (
  <div className="animate__animated animate__fadeIn">
    <SellerNavigation />
    <div className="xl:px-32 flex items-start body-screen pt-10 bg-[#6B6CB0]">
      <div className="hidden xl:block xl:w-[300px] rounded-xl p-5 ">
        <SellerAsideNavigation />
      </div>
      <div className="w-full mx-4 xl:w-3/4 mb-10 md:mx-10">
        <Outlet />
      </div>
    </div>

    <Footer />
  </div>
)
