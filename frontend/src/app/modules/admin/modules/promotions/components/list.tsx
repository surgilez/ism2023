import { Redux } from '@redux/interfaces/redux'
import { useDispatch, useSelector } from 'react-redux'
import NoFoundImg from '@assets/404.jpg'
import { activePromo } from '@redux/actions'
import { PromoAdmin } from '../interfaces'
import { ComponentLoader } from '@utils/components'
import { usePromiseTracker } from 'react-promise-tracker'

export const ListPromotions = () => {
  const { list } = useSelector((i: Redux) => i.admin.promo)
  const dispatch = useDispatch()

  const handleDetails = (promo: PromoAdmin) => {
    dispatch(activePromo(promo))
  }

  const { promiseInProgress } = usePromiseTracker({ area: 'promo_admin' })

  return (
    <div className="h-[750px] overflow-y-auto scroll_none">
      {promiseInProgress ? (
        <div className="h-full grid place-content-center">
          <ComponentLoader />
        </div>
      ) : (
        <div className="flex flex-col gap-7 mx-5 ">
          {list?.map((promo, i) => {
            const { img, title, description } = promo
            return (
              <div
                key={i}
                className="card shadow-xl image-full w-full h-[350px] "
              >
                <figure>
                  <img
                    src={
                      (img as string)
                        ? `${process.env.BACKEND}/${img as string}`
                        : NoFoundImg
                    }
                    alt="banner"
                    className="w-full h-full object-fill block"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-white text-3xl">{title}</h2>
                  <div className="card-actions justify-end ">
                    <div className=" w-full md:w-2/5 flex flex-col gap-4">
                      <div className="h-[200px] md:bg-base-100 rounded-xl shadow-xl md:text-black p-5 overflow-y-auto">
                        <span className="text-lg text-bold">
                          Detalle información
                        </span>

                        <div className="mt-3 md:text-gray-500">
                          {description}
                        </div>
                      </div>

                      <span
                        className="text-xl text-white text-center underline cursor-pointer"
                        onClick={() => handleDetails(promo)}
                      >
                        Ver detalle
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
