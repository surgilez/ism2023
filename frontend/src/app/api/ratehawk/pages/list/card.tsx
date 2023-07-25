import { useNavigate } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { RatingComponent } from '@utils/components/rating.jsx'
import { MembershipCart } from '@modules/shopping/interface'
import { Redux } from '@redux/interfaces/redux'
import { useDispatch, useSelector } from 'react-redux'
import {
  getHotelInfo,
  getRatesHotel,
  setTypeHotel,
} from '@api/ratehawk/redux/actions/hotel'
import { HotelInfo } from '@api/ratehawk/interface/hotel'
import { setModalPromoHotel, setPromoOpenModal } from '@redux/actions'

interface IProps {
  isClientModule?: boolean
  isPromo?: boolean
}

export const HotelListCard = ({
  isClientModule = true,
  isPromo = false,
}: IProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { filter, data } = useSelector((i: Redux) => i.api.ratehawk.region)
  const {
    client: {
      membership: { list: memberships },
    },
  } = useSelector((i: Redux) => i)

  const handleService = (hotel: HotelInfo) => {
    if (isClientModule) {
      navigate(`/client/service/hotel/1/${hotel.id}`)
    } else {
      dispatch(setTypeHotel('Seller'))
    }
    dispatch(getHotelInfo(hotel))
    sessionStorage.clear()
    const hotelRegion = data?.hotels
      ?.slice(0, 25)
      .filter(({ id }) => id === hotel.id)

    if (hotelRegion && hotelRegion.length > 0)
      dispatch(getRatesHotel(hotelRegion[0].rates as any))
  }

  const handleSelectHotelPromo = (hotel: HotelInfo) => {
    dispatch(setModalPromoHotel({ id: hotel.id, name: hotel.name }))
    dispatch(setPromoOpenModal(false, 'add'))
  }

  const HotelPrecios = (id: any, data: any) => {
    const objetoEncontrado = data.find((item: any) => item.id === id)
    if (objetoEncontrado) {
      const numeros = objetoEncontrado.rates.map(
        (item: any) => item.daily_prices[0]
      )
      const numeroMasPequeno = Math.min(...numeros)
      let precioFinal = numeroMasPequeno
      const calculoIva = precioFinal * (12 / 100)
      let precioFinalIva = precioFinal + calculoIva

      let membershipService: MembershipCart = {
        dsto: 0,
        name: '',
        state: false,
        exp: 0,
      }

      memberships?.forEach((item) => {
        const service = item.services?.find(
          ({ provider, service }) =>
            provider?.toLocaleLowerCase() === 'ratehawk' &&
            service === 'Hoteles'
        )

        if (service) {
          const { name, state } = item
          membershipService = {
            name: name || '',
            state: state || false,
            dsto: service.dsto as number,
            exp: item.exp as number,
          }
        }

        precioFinal =
          numeroMasPequeno + numeroMasPequeno * (membershipService.dsto / 100)
        const calculoIva = precioFinal * (12 / 100)
        precioFinalIva = precioFinal + calculoIva
      })

      return (
        <div>
          <div
            style={{ color: '#551991', fontWeight: 'bold', textAlign: 'right' }}
          >
            USD:
          </div>
          <div
            style={{ color: '#551991', fontWeight: 'bold', textAlign: 'right' }}
          >
            {precioFinalIva.toFixed(2)}
          </div>{' '}
        </div>
      )
    } else {
      return <>Error: Precio no encontrado</>
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      {filter?.length === 0 ? (
        <div className="grid place-content-center w-full min-h-[40vh]">
          <span
            className={`"block w-[200px] text-center ${
              isClientModule && 'text-white'
            }`}
          >
            No existen hoteles que coincidan con el criterio de búsquedaa
          </span>
        </div>
      ) : (
        filter?.map((item, i) => (
          <div
            key={i}
            className="w-full md:!min-w-[370px] lg:w-[370px] bg-base-100  rounded-xl shadow-xl p-4 animate__animated animate__bounceIn"
          >
            <Carousel
              emulateTouch
              showArrows={false}
              showThumbs={false}
              infiniteLoop
              showStatus={false}
            >
              {item.images.slice(1, 6).map((imgData, j) => (
                <div key={j}>
                  <img
                    src={imgData.replace('{size}', 'x500')}
                    alt="hotel"
                    className="h-[240px] object-cover"
                  />
                </div>
              ))}
            </Carousel>

            <div className="h-[100px]">
              <span className="block text-xl mt-5">{item.name}</span>

              <div className="flex gap-2 items-center text-gray-500">
                <i className="fa-solid fa-location-dot text-sm" />
                <span className="block text-xs">{item.address}</span>
              </div>

              <div className="flex gap-2 items-center text-gray-500">
                <i className="fa-solid fa-archway text-xs" />
                <span className="block text-xs">{item.kind}</span>
              </div>

              <div className="mt-2 flex gap-2">
                <RatingComponent
                  initialRating={item.star_rating}
                  fractions={2}
                  readonly
                  emptySymbol={
                    <i className="fa-regular fa-star text-primary text-sm" />
                  }
                  fullSymbol={
                    <i className="fa-solid fa-star text-primary text-sm" />
                  }
                />
                <span className="text-white px-2 rounded-lg bg-gradient-banner">
                  {item.star_rating}
                </span>
              </div>
            </div>

            {/* <ListaPrecios region={item} parametros={dataHotel} /> */}
            <div className="">
              {data && data.hotels && data.hotels[i].rates ? (
                <>{HotelPrecios(item.id, data.hotels)}</>
              ) : (
                <>asdasd</>
              )}
            </div>
            <div className="flex justify-end ">
              {isPromo ? (
                <button
                  type="button"
                  className="btn btn-sm btn__gold"
                  onClick={() => handleSelectHotelPromo(item)}
                >
                  Seleccionar hotel
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-sm btn__gold"
                  onClick={() => handleService(item)}
                >
                  ver detalles
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
