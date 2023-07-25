import { FieldArray } from 'formik'
import { IPropsPromoService } from '@admin/modules/promotions/interfaces'
import { HotelRatehawkPromoService } from '@api/ratehawk/components/promo/hotel'

export const HotelServicePromo = (props: IPropsPromoService) => {
  const { indexApi, indexServ, service } = props
  return (
    <FieldArray
      name={`informationApi[${indexApi}].services[${indexServ}].data`}
      render={(helper) => {
        if (service.id) {
          const serv = JSON.parse(service.id)
          if (
            serv.informationApiId === 'cl42qggmb189430hmym6qw68bi' &&
            serv.name === 'Hoteles'
          ) {
            return <HotelRatehawkPromoService helper={helper} {...props} />
          }
        }
        return <div />
      }}
    />
  )
}
