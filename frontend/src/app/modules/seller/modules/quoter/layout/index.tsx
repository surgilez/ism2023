import { Element } from 'react-scroll'
import { useEffect, useState } from 'react'
import { Service } from '@api/redux/interface'
import { Redux } from '@redux/interfaces/redux'
import { useDispatch, useSelector } from 'react-redux'
import { HotelListRatehawkPage } from '@api/ratehawk/pages'
import { setTypeHotel } from '@api/ratehawk/redux/actions/hotel'
import { DetailHotelRender } from '@api/ratehawk/pages/hotel/info'
import { animateScroll } from 'react-scroll'
import { SellerSearchQuoter } from '../components/search'
import { ClientsSellerShopping } from '../components/clients'

export const QuoterLayout = () => {
  const [service, setService] = useState<Service>()
  const dispatch = useDispatch()
  const [openModalHotel, setOpenModalHotel] = useState<boolean>(false)
  const {
    services: { list },
    ratehawk: { hotel },
  } = useSelector((i: Redux) => i.api)

  useEffect(() => {
    list.forEach((item) => {
      if (item.name === 'Hoteles') {
        setService(item)
      }
    })
  }, [setService, list])

  useEffect(() => {
    if (hotel.type === 'Seller') {
      setOpenModalHotel(true)
      animateScroll.scrollToTop({
        delay: 500,
        smooth: true,
        duration: 800,
      })
    } else {
      setOpenModalHotel(false)
    }
  }, [hotel.type])

  return (
    <>
      <h1 className="font-bold text-2xl text-white">Cotización</h1>
      <div className="mt-2 rounded-xl p-5 bg-[#001E36] min-h-[800px]">
        <span className="btn btn-ghost btn-sm px-7 border-2 border-white text-white p-2 cursor-pointer rounded-2xl">
          Inicio
        </span>

        <hr className="my-6 border-1 border-slate-200" />

        <div className="md:p-8">
          <ClientsSellerShopping />

          <SellerSearchQuoter
            service={service}
            setService={setService}
            list={list}
          />

          <Element name="anchorServiceSeller">
            {service && service.name === 'Hoteles' && list && (
              <div className="mt-10 p-3 bg-grandient-primary rounded-xl">
                {list.map(({ api, name }, i) => (
                  <div key={i}>
                    {name === 'Hoteles' &&
                      api?.name.toLowerCase().trim() === 'ratehawk' && (
                        <HotelListRatehawkPage isClientModule={false} />
                      )}
                  </div>
                ))}
              </div>
            )}
          </Element>
        </div>
      </div>

      <div className="w-full">
        <div className={`modal w-full ${openModalHotel && 'modal-open'}`}>
          <div
            className={`bg-gradient-body w-[100vw] h-[100vh] overflow-y-auto`}
          >
            <div className="w-full flex justify-end ">
              <div className="absolute w-fit right-10 top-5 ">
                <button
                  title="close"
                  type="button"
                  className="btn btn-sm btn-circle "
                  onClick={() => dispatch(setTypeHotel(undefined))}
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
            </div>

            <DetailHotelRender info={hotel.info} />
          </div>
        </div>
      </div>
    </>
  )
}
