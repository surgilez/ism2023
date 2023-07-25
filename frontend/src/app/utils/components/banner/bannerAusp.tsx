import Ausp1 from '@assets/banner/auspice/avianca.png'
import Ausp2 from '@assets/banner/auspice/budget.png'
import Ausp3 from '@assets/banner/auspice/iberia.png'
import Ausp4 from '@assets/banner/auspice/marriott.png'
import Ausp5 from '@assets/banner/auspice/sheraton.png'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useWidth } from '@utils/hooks/useWidth'

export const BannerAupList = ({
  rounded = 'rounded-[55px]',
  size = 'w-[80%]',
}: {
  rounded?: string
  size?: string
}) => {
  const breakpoint = 768
  const { width } = useWidth()

  return (
    <div className={`landing__header_foot ${size} `}>
      <div className={`landing__header_foot_bg ${rounded}`} />

      <div className="landing__header_foot_items ">
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
          <div>
            <img src={Ausp1} alt="banner" className="img_banner" />
          </div>
          <div>
            <img src={Ausp2} alt="banner" className="img_banner" />
          </div>
          <div>
            <img src={Ausp3} alt="banner" className="img_banner" />
          </div>
          <div>
            <img src={Ausp4} alt="banner" className="img_banner" />
          </div>
          <div>
            <img src={Ausp5} alt="banner" className="img_banner" />
          </div>
        </Carousel>
      </div>
    </div>
  )
}
