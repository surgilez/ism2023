import { ListSellerReport } from '@modules/seller/components/listReport'
import { SearchReport } from '../components'

export const ClientLayout = () => (
  <>
    <h1 className="font-bold text-2xl text-white">Clientes</h1>
    <div className="mt-2 rounded-xl p-5 bg-[#001E36] min-h-[800px]">
      <span className="btn btn-ghost btn-sm px-7 border-2 border-white text-white p-2 cursor-pointer rounded-2xl">
        Cartera
      </span>

      <hr className="my-6 border-1 border-slate-200" />

      <SearchReport />
      <div className="mt-5">
        <ListSellerReport />
      </div>
    </div>
  </>
)
