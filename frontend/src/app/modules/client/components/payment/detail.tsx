import { Redux } from '@redux/interfaces/redux'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
export const PaymentDetail = () => {
  const { shopping, total } = useSelector((i: Redux) => i.shopping)
  const [totales, setTotales] = useState<{
    total_rest: number
    total_tax: number
    total_discount: number
  }>({
    total_rest: 0,
    total_tax: 0,
    total_discount: 0,
  })

  useEffect(() => {
    if (shopping && shopping.length > 0) {
      let total_rest = 0
      let total_tax = 0
      let total_discount = 0

      shopping.forEach(({ service: { name }, subtotal, iva, discount }) => {
        if (name === 'Hoteles') {
          total_rest += subtotal
        }
        total_tax += iva
        total_discount += discount
      })

      setTotales({
        total_rest,
        total_tax,
        total_discount,
      })
    } else {
      setTotales({
        total_rest: 0,
        total_tax: 0,
        total_discount: 0,
      })
    }
  }, [shopping, setTotales])

  return (
    <div className="w-full">
      <span className="font-bold text-md">DETALLE DEL PAGO</span>

      <div className="rounded-xl mt-4 bg-base-100 shadow-xl p-5 text-black">
        <div className="flex justify-between">
          <span>Hospedaje</span>
          <strong>
            USD <span>{totales.total_rest.toFixed(2)}</span>
          </strong>
        </div>
        <div className="flex justify-between">
          <span>Impuestos tasas y cargos</span>
          <strong>
            USD <span>{(totales.total_tax || 0).toFixed(2)}</span>
          </strong>
        </div>
        <div className="flex justify-between">
          <span>Descuentos</span>
          <strong>
            USD <span>{(totales.total_discount || 0).toFixed(2)}</span>
          </strong>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <span className="text-[#003C6B] font-bold">Total</span>
          <strong>
            USD <span>{(total || 0).toFixed(2)}</span>
          </strong>
        </div>
      </div>
    </div>
  )
}
