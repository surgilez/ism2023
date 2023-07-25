import { Outlet } from 'react-router-dom'
import { MembersNavigation } from '@admin/modules/membership/components'

export const MemberShipLayout = () => (
  <>
    <h1 className="font-bold text-2xl text-white">Membresía</h1>
    <div className="mt-2 rounded-xl p-5 bg-primary min-h-[800px]">
      <MembersNavigation />
      <hr className="my-6 border-1 border-slate-200" />
      <Outlet />
    </div>
  </>
)
