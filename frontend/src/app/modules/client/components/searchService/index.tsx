/* eslint-disable default-case */
import { HotelRatehawk } from '@api/ratehawk/components'
import { ChangeEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redux } from '@redux/interfaces/redux'
import { Service } from '@api/redux/interface'
import { TService } from '@client/interface'

interface IProps {
  title: string
  subtitle: string
  serviceName?: TService
}

export const SearchService = ({
  title,
  subtitle,
  serviceName = 'Hoteles',
}: IProps) => {
  const [service, setService] = useState<Service>()
  const { list } = useSelector((i: Redux) => i.api.services)

  useEffect(() => {
    list.forEach((item) => {
      if (item.name === serviceName) {
        setService(item)
      }
    })
  }, [setService, list])

  const handleChangeServiceRadio = (
    e: ChangeEvent<HTMLInputElement>,
    radioService: Service
  ) => {
    setService(radioService)
  }

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 mx-auto mt-[4%] md:mt-[6%] 2xl:md:mt-[8%] flex justify-center px-5">
      <div className="p-7 md:p-0 xl:w-[70%] 2xl:w-[60%] xl:mb-20">
        <div className="text-white">
          <span className="block text-center sm:text-left text-3xl md:text-5xl font-bold">
            {title}
          </span>
          <p className="text-base text-center mt-4 sm:text-left  md:text-xl">
            {subtitle}
          </p>
        </div>

        <div className="bg-grandient-primary rounded-xl p-5 sm:p-8 mt-8">
          <span className="block text-xl text-blue-900 font-bold">
            Servicios
          </span>
          <span className="block text-xs italic text-gray-500">
            Selecciona el servicio de interés
          </span>

          <div className="mt-2">
            <div className="flex gap-3 p-2 rounded bg-[#ECECCC] justify-between md:justify-evenly flex-wrap">
              {list.map((item, i) => (
                <label className="flex gap-2 cursor-pointer" key={i}>
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
                service.state && <HotelRatehawk />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
