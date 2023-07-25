import { ListPromotions } from '../components'

export const PromoClient = () => (
  <div className="p-5 flex justify-center">
    <div className="w-full xl:w-[1200px] mt-8">
      <span className="font-medium text-xl text-white ">Promociones</span>

      <div className="mt-8">
        <ListPromotions />
      </div>
    </div>
  </div>
)
