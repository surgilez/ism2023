import { BannerAupList } from '@utils/components'
import { SearchService } from '../searchService'

export const MainHeader = () => (
  <div className="relative">
    <div className="w-full top-0 h-[950px] lg:min-h-[90vh] service_container_main" />
    <SearchService
      title="El destino de tus sueños, está aquí"
      subtitle="¡Comienza a diseñar tu viaje!"
    />

    <div className="pt-12">
      <BannerAupList rounded="rounded-2xl" />
    </div>
  </div>
)
