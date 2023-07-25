import { ListSellerReport } from '@modules/seller/components/salesReport'
import { SearchReportSeller } from '../components'

export const ReportsLayout = () => (
  <>
    <h1 className="font-bold text-2xl text-white">Reporte de ventas</h1>
    <div className="mt-2 rounded-xl p-5 bg-[#001E36] min-h-[800px]">
      <span className="btn btn-ghost btn-sm px-7 border-2 border-white text-white p-2 cursor-pointer rounded-2xl">
        Mis ventas
      </span>

      <hr className="my-6 border-1 border-slate-200" />

      <SearchReportSeller />

      <div className="mt-5">
        <ListSellerReport />
      </div>
    </div>
  </>
)
