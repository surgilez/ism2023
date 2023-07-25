import { Outlet } from 'react-router-dom'
import { ReportNavigation } from '../components'

export const ReportLayout = () => (
  <>
    <h1 className="font-bold text-2xl text-white">Reportes</h1>
    <div className="mt-2 rounded-xl p-5 bg-primary min-h-[800px]">
      <ReportNavigation />
      <hr className="my-6 border-1 border-slate-200" />
      <Outlet />
    </div>
  </>
)
