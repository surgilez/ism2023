import { HotelRatehawk } from '@api/ratehawk/components'
import { Service } from '@api/redux/interface'
import { TService } from '@modules/client/interface'
import { ChangeEvent, Dispatch } from 'react'

interface IProps {
  serviceName?: TService
  service: Service | undefined
  setService: Dispatch<React.SetStateAction<Service | undefined>>
  list: Service[]
}

export const SellerSearchQuoter = ({
  serviceName = 'Hoteles',
  service,
  setService,
  list,
}: IProps) => {
  const handleChangeServiceRadio = (
    e: ChangeEvent<HTMLInputElement>,
    radioService: Service
  ) => {
    setService(radioService)
  }

  return (
    <div className="bg-grandient-primary rounded-xl p-5 sm:p-8 mt-8">
      <span className="block text-xl text-blue-900 font-bold">Servicios</span>
      <span className="block text-xs italic text-gray-500">
        Selecciona el servicio de interés
      </span>

      <div className="mt-2">
        <div className="flex gap-3 p-2 rounded bg-[#ECECCC] justify-between md:justify-evenly flex-wrap">
          {list.map((item, i) => (
            <label className="flex  gap-2 cursor-pointer w-[100px]" key={i}>
              <input
                key={i}
                value={item.name}
                defaultChecked={serviceName === item.name}
                onChange={(ev) => handleChangeServiceRadio(ev, item)}
                type="radio"
                name="services"
                className="radio checked:bg-blue-500 radio-xs md:radio-sm"
              />
              <span>{item.name}</span>
            </label>
          ))}
        </div>
        <div className="mt-4">
          {list &&
            service?.name === 'Hoteles' &&
            service?.api?.state &&
            service.state && <HotelRatehawk isClientModule={false} />}
        </div>
      </div>
    </div>
  )
}
