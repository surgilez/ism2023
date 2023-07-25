import { Redux } from '@redux/interfaces/redux'
import { useSelector } from 'react-redux'
import NoFoundImg from '@assets/404.jpg'
// import { PromoAdmin } from '@modules/admin/modules/promotions/interfaces'

export const ListPromoSeller = () => {
  const { list } = useSelector((i: Redux) => i.admin.promo)

  // const handleSell = (promo: PromoAdmin) => {
  //   console.log(promo)
  // }

  return (
    <div className="h-[750px] overflow-y-auto ">
      <div className="flex flex-col gap-7 mx-5 ">
        {list?.map((promo, i) => {
          const { img, title, description } = promo
          return (
            <div key={i} className="card shadow-xl image-full w-full h-[350px]">
              <figure>
                <img
                  src={
                    (img as string)
                      ? `${process.env.BACKEND}/${img as string}`
                      : NoFoundImg
                  }
                  alt="banner"
                  className="w-full h-[350px] object-cover block"
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

                      <div className="mt-3 md:text-gray-500">{description}</div>
                    </div>

                    {/* <span
                      className="btn btn__gold btn_sm"
                      onClick={() => handleSell(promo)}
                    >
                      <i className="fa-solid fa-cart-shopping" />
                      <span className="ml-4">Vender</span>
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
