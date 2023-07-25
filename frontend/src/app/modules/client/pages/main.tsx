import bgtImg from '@assets/tmp/bogota.jpg'
import { LandingBody } from '@modules/landing/components'

import {
  MainHeader,
  TopServiceHotel,
  TopServiceFlight,
  TopServiceShip,
} from '../components'

export const MainPageClient = () => (
  <div>
    <MainHeader />

    <div className="flex justify-center px-10 lg:px-0 w-full">
      <img
        src={bgtImg}
        alt="banner"
        className="object-cover block lg:w-[800px] h-full rounded-2xl shadow-xl"
      />
    </div>

    <div className="w-full flex justify-center py-10">
      <div className="w-full xl:w-[1200px] px-10 xl:px-0">
        <LandingBody />
        <TopServiceFlight />
        <TopServiceHotel />
        <TopServiceShip />
      </div>
    </div>
  </div>
)
