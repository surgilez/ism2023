import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { BannerAupList } from '@utils/components'
import { Link } from 'react-router-dom'

export const LandingHeader = () => (
  <div className="landing__header_container !px-5">
    <div className="landing__header_description text-white">
      <h2 className="text-7xl block text-center md:text-left 2xl:text-8xl">
        Viaja
      </h2>
      <p className="text-xl my-10 block text-center md:text-left 2xl:text-2xl px-4">
        Con la membresía que te brinda beneficios en en ahorros y descuentos
        exclusivos
      </p>
      <div className="w-full ml-5 sm:ml-0">
        <Link to="/contacts" className="btn btn__gold w-[250px]">
          Contactanos
        </Link>
      </div>
    </div>

    <BannerAupList />
  </div>
)
