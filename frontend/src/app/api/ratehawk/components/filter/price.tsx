import { setFilterHotel } from '@api/ratehawk/redux/actions/region'
import { Redux } from '@redux/interfaces/redux'
import { useDebounce } from '@utils/hooks/useDebounce'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { existActiveFilters } from '@helpers/filters'

interface IProps {
  isClientModule?: boolean
}

export const FilterPrice = ({ isClientModule = true }: IProps) => {
  const dispatch = useDispatch()
  const { hotel, filter, data } = useSelector(
    (i: Redux) => i.api.ratehawk.region
  )
  const [precioMin, setPrecioMin] = useState(0)
  const [precioMax, setPrecioMax] = useState(0)
  const [precio, setPrecio] = useState(100)
  const hotelPrecio: any = [{}]
  const hotelPrecioM: any = []
  const { handleSetTimeOut } = useDebounce()

  useEffect(() => {
    data?.hotels?.map((item: any) => {
      const numeros = item.rates.map((item: any) => item.daily_prices[0])
      const numeroMasPequeno = Math.min(...numeros)
      const newHotelPrecio = { id: item.id, precioBajo: numeroMasPequeno }
      hotelPrecioM.push(newHotelPrecio)
    })
    const numeros = hotelPrecioM.map((item: any) => item.precioBajo)
    const numeroMasPequeno = Math.min(...numeros)
    const numeroMasGrande = Math.max(...numeros)
    setPrecioMin(numeroMasPequeno)
    setPrecioMax(numeroMasGrande)
    setPrecio(numeroMasGrande)
  }, [])

  const handleKeyPress = (ev: any) => {
    const { value } = ev.target as HTMLInputElement

    setPrecio(ev.target.value)
    if (precio) {
      sessionStorage.setItem('priceHotelFilter', value.toLocaleLowerCase())
    } else {
      sessionStorage.removeItem('priceHotelFilter')
    }

    let result: any = null
    let result1: any = null
    const activeFilters = existActiveFilters()

    handleSetTimeOut(async () => {
      if (activeFilters) {
        data?.hotels?.map((item: any, i) => {
          const numeros = item.rates.map((item: any) => item.daily_prices[0])
          const numeroMasPequeno = Math.min(...numeros)
          const newHotelPrecio = { id: item.id, precioBajo: numeroMasPequeno }

          hotelPrecio.push(newHotelPrecio)
        })
        result1 = hotelPrecio?.filter((item: any) => item.precioBajo <= precio)

        result = hotel?.filter((item) =>
          result1.some((item2: any) => item2.id === item.id)
        )
        console.log(result)
      } else if (filter?.length === hotel?.length) {
        result = hotel?.filter(({ name }) => {
          return name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        })
      } else if (!activeFilters) {
        result = hotel
      } else {
        result = filter?.filter(({ name }) => {
          return name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        })
      }

      if (result) {
        dispatch(setFilterHotel(result))
      }
    }, 300)
  }

  return (
    <li className="collapse bg-transparent border-b-2 border-[#003C6B]">
      <input type="checkbox" className="!min-h-0" />
      <div className="collapse-title text-md flex justify-between p-0">
        <span className="text-sm">Precio</span>
        <i
          className={`fa-solid fa-caret-down  ${
            isClientModule ? 'text-primary' : 'text-secondary'
          }`}
        />
      </div>
      <div className="collapse-content">
        <div className="pt-3">
          Precios menores a:
          <input
            type="text"
            placeholder="Nombre del hotel"
            autoComplete="off"
            value={precio}
            className={`"w-full input input-sm bg-transparent 
                shadow-none border border-[#002440]`}
          />
          <div>
            <input
              type="range"
              min={precioMin}
              max={precioMax}
              onChange={handleKeyPress}
              value={precio}
            />
          </div>
        </div>
        {/* <div className="pt-3">
          Rango Maximo
          <input
            type="text"
            placeholder="Nombre del hotel"
            autoComplete="off"
            value={precio}
            className={`"w-full input input-sm bg-transparent 
                shadow-none border border-[#002440]`}
          />
          <div>
            <input
              type="range"
              min={precioMin}
              max={precioMax}
              onChange={handleKeyPress}
              value={precio}
            />
          </div> 
        </div>*/}
      </div>
    </li>
  )
}
