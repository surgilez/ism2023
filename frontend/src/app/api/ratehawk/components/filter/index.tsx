import { FilterName } from './name'
import { StartFilter } from './start'
import { TypeHotel } from './type'
import { FilterPrice } from './price'

interface IProps {
  isClientModule?: boolean
}

export const HotelFilter = ({ isClientModule = true }: IProps) => (
  <div className="shadow-xl h-full w-[300px]">
    <div
      className={`card w-full p-3 h-[47vh] overflow-y-auto scroll_none ${
        isClientModule ? ' bg-[#70818e]' : 'bg-base-100'
      }`}
    >
      <span
        className={`block text-center text-xl font-medium my-4 ${
          isClientModule ? 'text-white ' : 'text-secondary'
        }`}
      >
        Filtra tu búsqueda
      </span>
      <ul
        className={`flex flex-col gap-3 my-5 ${
          isClientModule ? '!text-white' : '!text-secondary'
        }`}
      >
        <FilterName isClientModule={isClientModule} />
        <StartFilter isClientModule={isClientModule} />
        <TypeHotel isClientModule={isClientModule} />
        <FilterPrice isClientModule={isClientModule} />
      </ul>
    </div>
  </div>
)
