import { useParams } from 'react-router-dom'
import { HotelListRatehawkPage } from '@api/ratehawk/pages'
import { useSelector } from 'react-redux'
import { Redux } from '@redux/interfaces/redux'
import { Element, scroller } from 'react-scroll'
import { useEffect } from 'react'
import { SearchService } from '../components'
import { TService } from '../interface'

type TParams = {
  type: TService
}

export const Services = () => {
  const { type } = useParams<TParams>()
  const {
    services: { list },
    mark: { state },
  } = useSelector((i: Redux) => i.api)

  useEffect(() => {
    if (state) {
      scroller.scrollTo('anchorService', {
        duration: 1200,
        delay: 0,
        smooth: true,
        offset: -100,
      })
    }
  }, [state])

  return (
    <div className="bg-base-100">
      <div className="relative">
        <div className="w-full h-[950px] md:h-[93vh] service_container_2" />
        <SearchService
          title="Estamos a un click de tus sueños"
          subtitle="¿Estas preparado?"
          serviceName={type}
        />
      </div>
      <Element name="anchorService">
        <div className="!p-10 xl:!px-32">
          {type === 'Hoteles' &&
            list &&
            list.map((services, i) => (
              <div key={i}>
                {services.name === 'Hoteles' &&
                  services.api?.name.toLowerCase().trim() === 'ratehawk' && (
                    <HotelListRatehawkPage />
                  )}
              </div>
            ))}
        </div>
      </Element>
    </div>
  )
}
