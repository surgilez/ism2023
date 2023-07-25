import { BannerBankList } from '@utils/components/banner'

export const LandingBody = () => {
  const data = [
    {
      img: 'https://images.unsplash.com/photo-1565613432435-6151eaad66fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
      city: 'Quito',
      cod: '3D/2N',
      p_afiliado: '150',
      p_normal: '230',
    },
    {
      img: 'https://images.unsplash.com/photo-1628004566999-83b23fdc411f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
      city: 'Guayaquil',
      cod: '3D/2N',
      p_afiliado: '210',
      p_normal: '290',
    },
    {
      img: 'https://images.unsplash.com/photo-1610226977124-9fd2755d09f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
      city: 'Cuenca',
      cod: '3D/2N',
      p_afiliado: '220',
      p_normal: '330',
    },
    {
      img: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
      city: 'Orlando',
      cod: '8D/7N',
      p_afiliado: '1250',
      p_normal: '1750',
    },
    {
      img: 'https://images.unsplash.com/photo-1616423841125-8307665a0469?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
      city: 'Cancún',
      cod: '8D/7N',
      p_afiliado: '680',
      p_normal: '1330',
    },
    {
      img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80',
      city: 'Tour Europa',
      cod: '19D/18N',
      p_afiliado: '2250',
      p_normal: '4000',
    },
  ]

  return (
    <div className="mt-10">
      <div className="flex gap-5 flex-wrap justify-center xl:justify-between mt-5">
        {data.map((item, i) => (
          <div
            key={i}
            className="shadow-xl w-[380px] flex gap-2 rounded-lg xl:h-[260px]"
          >
            <img
              src={item.img}
              alt="img_service"
              className="block h-full object-cover w-1/2 rounded-l-lg"
            />

            <div className="flex flex-col w-1/2 bg-base-100 rounded-r-lg">
              <div className="text-white bg-[#6B6CB0] p-2">
                <span className="text-3xl font-bold block">{item.city}</span>
                <span className="text-sm block px-2">{item.cod}</span>
              </div>
              <div className="p-2">
                <div className="text-[#6B6CB0] font-bold mb-2">
                  <p className="text-sm sm:text-lg">Precio afiliados</p>
                  <span>
                    {`$${item.p_afiliado} `}
                    <small>(Desde)</small>
                  </span>
                </div>
                <hr className="px-2 block" />
                <div className="text-gray-500 font-bold">
                  <p className="text-sm sm:text-lg">Precio Normal</p>
                  <span>
                    {`$${item.p_normal} `}
                    <small>(Desde)</small>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-[100px] w-full relative mt-8">
        <BannerBankList />
      </div>
    </div>
  )
}
