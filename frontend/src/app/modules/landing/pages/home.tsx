import { LandingHeader, LandingBody } from '@modules/landing/components'

export const HomeScreen = () => (
  <div className="animate__animated animate__fadeIn">
    <div className="landing__header  overflow-hidden">
      <LandingHeader />

      <div className="w-full flex justify-center py-10">
        <div className="w-full xl:w-[1200px] px-8 xl:px-0">
          <LandingBody />
        </div>
      </div>
    </div>
  </div>
)
