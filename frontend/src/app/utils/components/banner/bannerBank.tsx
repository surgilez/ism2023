import Ausp1 from '@assets/banner/bank/austro.svg'
import Ausp2 from '@assets/banner/bank/bolivariano.svg'
import Ausp3 from '@assets/banner/bank/internacional.svg'
import Ausp4 from '@assets/banner/bank/pacifico.svg'
import Ausp5 from '@assets/banner/bank/pichincha.svg'
import { Carousel } from 'react-responsive-carousel'
import { useWidth } from '@utils/hooks/useWidth'
import { useLocation } from 'react-router-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export const BannerBankList = () => {
  const breakpoint = 768
  const { width } = useWidth()
  const { pathname } = useLocation()

  return (
    <div className="landing__header_foot w-full">
      <div className="landing__header_foot_bg" />
      <div
        className={`landing__header_foot_items rounded-3xl ${
          pathname.endsWith('/') && 'bg-gray-200 '
        }`}
      >
        <Carousel
          autoPlay
          centerMode={width > breakpoint}
          centerSlidePercentage={30}
          dynamicHeight
          infiniteLoop
          interval={2000}
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
        >
          <div className="w-full ">
            <img src={Ausp1} alt="banner" className="img_banner" />
          </div>
          <div className="w-full ">
            <img src={Ausp2} alt="banner" className="img_banner" />
          </div>
          <div className="w-full ">
            <img src={Ausp3} alt="banner" className="img_banner" />
          </div>
          <div className="w-full ">
            <img src={Ausp4} alt="banner" className="img_banner" />
          </div>
          <div className="w-full ">
            <img src={Ausp5} alt="banner" className="img_banner" />
          </div>
        </Carousel>
      </div>
    </div>
  )
}
