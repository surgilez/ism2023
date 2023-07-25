import { ListPromoSeller } from '../components'

export const PromotionsLayout = () => (
  <>
    <h1 className="font-bold text-2xl text-white">Promociones</h1>
    <div className="mt-2 rounded-xl p-5 bg-[#001E36] min-h-[800px]">
      <span className="btn btn-ghost btn-sm px-7 border-2 border-white text-white p-2 cursor-pointer rounded-2xl">
        Motor de búsqueda
      </span>

      <hr className="my-6 border-1 border-slate-200" />

      <ListPromoSeller />
    </div>
  </>
)
