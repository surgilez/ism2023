import moment from '@helpers/moment'
import { IServiceShopping, MembershipCart } from '@modules/shopping/interface'
import { pipeMeal } from '@utils/pipes/hotel'
import { startAddNewItemShopping } from '@redux/actions/shopping'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import type { Rates } from '@api/ratehawk/interface/utils'
import { Redux } from '@redux/interfaces/redux'
import { TAPIService } from '@api/redux/interface'
interface IProps {
  rate: Rates
}

export const RoomRate = ({ rate }: IProps) => {
  const {
    api: {
      ratehawk: {
        hotel: { info },
      },
      services: { list: listServices },
    },
    client: {
      membership: { list: memberships },
    },
    auth: { uid },
    user: { rol },
    seller: {
      client: { clientActive },
    },
  } = useSelector((i: Redux) => i)

  const {
    room_data_trans,
    rg_ext,
    payment_options: { payment_types },
    meal,
  } = rate

  const dispatch = useDispatch()

  const [service, setService] = useState<IServiceShopping | null>(null)
  const [membership, setMembership] = useState<MembershipCart | undefined>(
    undefined
  )
  const [price, setPrice] = useState<{
    base: number
    profit: number
    subtotal: number
    iva: number
    discount: number
    total: number
  }>({
    base: 0,
    profit: 0,
    subtotal: 0,
    iva: 0,
    discount: 0,
    total: 0,
  })

  const handleAddToCart = (rate: Rates) => {
    if (service) {
      const { api, ...rest } = service

      const searchConditionStorage = localStorage.getItem('util')
      let searchCondition = null
      if (searchConditionStorage) {
        searchCondition = JSON.parse(searchConditionStorage)
      } else {
        searchCondition = {
          checkin: moment(new Date()).format('YYYY-MM-DD'),
          checkout: moment(new Date()).add(1, 'day').format('yyyy-MM-DD'),
          night: 1,
          info: {
            people: 2,
            rooms: 1,
          },
        }
      }
      const checkin = moment(searchCondition.checkin).unix()
      const checkout = moment(searchCondition.checkout).unix()

      dispatch(
        startAddNewItemShopping(
          {
            id: rate.book_hash,
            book_hash: rate.book_hash,
            match_hash: rate.match_hash,
            ...price,
            img: info?.images.slice(0, 4) || [],
            name: info?.name,
            checkin,
            checkout,
            item_name: rate.room_data_trans.main_name,
            description: rate.room_data_trans.bedding_type,
            night: searchCondition ? searchCondition.night : 1,
            date: moment(new Date()).unix(),
            service: {
              ...rest,
              api,
            },
            membership,
            testMode: info?.name === 'Test Hotel (Do Not Book)',
          },
          rol && rol === 'seller' ? String(clientActive?.id) : String(uid)
        )
      )
    }
  }

  const formatearFecha = (fecha: any) => {
    const fechaActual = new Date(fecha)
    const dia = fechaActual.getDate()
    const mes = fechaActual.getMonth() + 1 // Se suma 1 ya que los meses van de 0 a 11
    const anio = fechaActual.getFullYear()
    const fechaFormateada = ` ${dia}/${mes}/${anio}`
    return (
      <div
        style={{ color: 'green' }}
        className="inline-block text-sm ml-1 text-gray-500"
      >
        <span className="text-sm">
          Esta habitación se puede cancelar antes del:
        </span>
        <span className="text-sm">{fechaFormateada}</span>
      </div>
    )
  }

  useEffect(() => {
    const serviceAux = listServices.find(
      (item) =>
        item.name === 'Hoteles' &&
        item.api?.name.toLocaleLowerCase() === 'ratehawk'
    )

    if (serviceAux) {
      const { api, ...rest } = serviceAux
      const api_name = api?.name as TAPIService
      setService({ ...rest, api: api_name } as IServiceShopping)
    }
  }, [rate, setService])

  useEffect(() => {
    if (service) {
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
      })

      // const tax = rate.payment_options.payment_types[0].tax_data.taxes.reduce(
      //   (acc, val) => {
      //     let res = 0
      //     if (val.included_by_supplier) {
      //       res += acc + Number(val.amount)
      //     }
      //     return Number(res.toFixed(2))
      //   },
      //   0
      // )

      // const base = Number(rate.payment_options.payment_types[0].amount) + tax
      const base = Number(rate.payment_options.payment_types[0].amount)

      let profitPercent = service.profit
      let discountPercent = 0
      let profit = 0
      let subtotal = 0
      let iva = 0
      let discount = 0
      let total = 0

      if (profitPercent <= 0) profitPercent = 0

      // if (
      //   membershipService &&
      //   membershipService.state &&
      //   moment
      //     .unix(Number(membershipService.exp))
      //     .isSameOrAfter(moment(new Date()))
      // ) {
      //   setMembership(membershipService)
      //   discountPercent = membershipService.dsto
      // }

      discountPercent = membershipService.dsto
      if (discountPercent == 0) {
        profit = base * (profitPercent / 100)
        subtotal = base + profit
        iva = subtotal * (12 / 100)
        discount = subtotal * (discountPercent / 100)
        total = subtotal + iva - discount
      }
      if (discountPercent > 0) {
        profit = base * (profitPercent / 100)
        subtotal = base + profit
        iva = (base + base * (discountPercent / 100)) * (12 / 100)
        total = iva + base + base * (discountPercent / 100)

        discount = subtotal - (base + base * (discountPercent / 100))
        // total = iva + base + base * (discountPercent / 100)
      }
      // profit = base * (profitPercent / 100)
      // console.log('base', profit, base, profitPercent / 100)
      // subtotal = base + profit
      // console.log('subtotal', subtotal)
      // discountPercent / 100
      // discount = subtotal * (discountPercent / 100)
      // total = subtotal + iva - discount

      console.log('base', base)
      console.log('profit', profit)
      console.log('subtotal', subtotal)
      console.log('iva', iva)
      console.log('total', total)
      console.log('descuento', discount)
      setPrice((val) => ({
        ...val,
        base,
        profit,
        subtotal,
        iva,
        discount,
        total,
      }))
    }
  }, [service, setPrice, memberships, setMembership])

  return (
    <div className="border rounded-lg p-3 md:w-[400px] flex-auto bg-base-200">
      <div className="flex flex-col md:flex-row gap-2 justify-between">
        <div className="text-gray-500 min-h-[50px]">
          <span className="font-bold block text-xl">
            {room_data_trans.main_name}
          </span>
          <span className="text-sm font-semibold">
            {room_data_trans.bedding_type}
          </span>
        </div>
        <div>
          <div className="font-bold text-[#4E5B96] text-lg md:text-xl min-w-max">
            <span>{payment_types[0].show_currency_code}</span>
            <span>{price.total.toFixed(2)}</span>
          </div>
          {/* <div className="flex text-sm gap-1 text-[#4E5B96] font-bold ">
            <span>
              {payment_types[0].show_currency_code}{' '}
              {Number(payment_types[0].amount).toFixed(2)}
            </span>
            <span style={{ fontSize: '10px' }}>sin impuestos</span>
          </div> */}
        </div>
      </div>
      <div className="flex gap-2 flex-wrap items-center mt-3">
        <div className="tooltip" data-tip={`capacidad: ${rg_ext.capacity}`}>
          <i className="fa-solid fa-user-group text-sm cursor-pointer text-gray-400" />
        </div>
        <div className="tooltip" data-tip={`clase: ${rg_ext.class}`}>
          <i className="fa-solid fa-star text-sm cursor-pointer text-gray-400" />
        </div>
        <div className="tooltip" data-tip={`calidad: ${rg_ext.quality}`}>
          <i className="fa-solid fa-award text-sm cursor-pointer text-gray-400" />
        </div>
        <div className="tooltip" data-tip={`cama de sexo: ${rg_ext.sex}`}>
          <i className="fa-solid fa-genderless text-xl cursor-pointer text-gray-400" />
        </div>
        <div className="tooltip" data-tip={`cobertores: ${rg_ext.bedding}`}>
          <i className="fa-solid fa-bed text-sm cursor-pointer text-gray-400" />
        </div>
        <div className="tooltip" data-tip={`baños: ${rg_ext.bathroom}`}>
          <i className="fa-solid fa-toilet text-sm cursor-pointer text-gray-400" />
        </div>
        <div className="tooltip" data-tip={`club: ${rg_ext.club}`}>
          <i className="fa-solid fa-kaaba text-sm cursor-pointer text-gray-400" />
        </div>
      </div>
      <hr className="my-3 border-gray-400" />
      <div className="my-4 flex flex-col gap-1">
        <div>
          <i className="fa-solid fa-utensils mr-2 btn btn-xs btn-circle" />
          <span className="text-gray-500 text-sm">
            {meal !== 'nomeal'
              ? `se incluye ${pipeMeal(meal)}`
              : 'No se incluyen comidas'}
          </span>
        </div>

        {/* {payment_types[0].tax_data.taxes.map(
          ({ name, currency_code, amount, included_by_supplier }, j) => (
            <div key={j}>
              <i className="fa-solid fa-dollar-sign mr-2 btn btn-xs btn-circle" />
              <span className="text-gray-500 text-sm">{name}</span>
              <span className="text-gray-500 ml-1 text-sm">
                {included_by_supplier ? 'incluido' : 'no incluido'}
              </span>
              <div className="inline-block text-sm ml-1 text-gray-500">
                <span>{currency_code}</span>
                <span className="ml-1">{amount}</span>
              </div>
            </div>
          )
        )} */}

        {payment_types[0].tax_data?.taxes ? (
          payment_types[0].tax_data.taxes.map(
            ({ name, currency_code, amount, included_by_supplier }, j) => (
              <div key={j}>
                <i className="fa-solid fa-dollar-sign mr-2 btn btn-xs btn-circle" />
                <span className="text-gray-500 text-sm">{name}</span>
                <span className="text-gray-500 ml-1 text-sm">
                  {included_by_supplier ? 'incluido' : 'no incluido'}
                </span>
                <div className="inline-block text-sm ml-1 text-gray-500">
                  <span>{currency_code}</span>
                  <span className="ml-1">{amount}</span>
                </div>
              </div>
            )
          )
        ) : (
          <span></span>
        )}
      </div>
      <hr className="my-3 border-gray-400" />
      {payment_types[0].cancellation_penalties.free_cancellation_before ? (
        <div>
          <i className="fa-solid fa-cancel mr-2 btn btn-xs btn-circle" />
          {formatearFecha(
            payment_types[0].cancellation_penalties.free_cancellation_before
          )}
        </div>
      ) : (
        <div
          style={{ color: 'red' }}
          className="inline-block text-sm ml-1 text-gray-500"
        >
          <i className="fa-solid fa-cancel mr-2 btn btn-xs btn-circle" />
          <span className="text-sm">Esta habitación no es cancelable</span>
        </div>
      )}
      <hr className="my-3 border-gray-400" />
      <div className="flex justify-end">
        <button
          type="button"
          className="btn btn-sm btn__gold"
          onClick={() => handleAddToCart(rate)}
        >
          <i className="fa-solid fa-cart-shopping mr-3" />
          <span>agregar</span>
        </button>
      </div>
    </div>
  )
}
