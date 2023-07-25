import { useState } from 'react'
import { ListPromotions, NewPromo } from '../components'

export const PromotionsScreen = () => {
  const modal = useState(false)

  return (
    <>
      <h1 className="font-bold text-2xl text-white">Promociones</h1>
      <div className="mt-2 rounded-xl p-5 bg-primary min-h-[800px]">
        <div className="flex gap-5">
          <span className="btn btn-ghost btn-sm border-2 border-gray-500 p-2 px-4 cursor-pointer rounded-2xl subNavActive">
            Existentes
          </span>
          <span
            className="btn btn-ghost btn-sm border-2 border-gray-500 p-2 px-7 cursor-pointer rounded-2xl"
            onClick={() => modal[1](true)}
          >
            Crear
          </span>
        </div>

        <hr className="my-6 border-1 border-slate-200" />

        <ListPromotions />
        <NewPromo modal={modal} />
      </div>
    </>
  )
}
