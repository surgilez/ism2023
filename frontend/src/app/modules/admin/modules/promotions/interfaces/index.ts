import { FieldArrayRenderProps, FormikErrors } from 'formik'

export interface PromoHotel {
  id: string
  name?: string
  dsto?: string | number
}
export interface PromoService {
  id?: string
  data: PromoHotel[]
}
export interface PromoApi {
  id?: string
  services: PromoService[]
}
export interface PromoAdmin {
  id?: string
  img?: string | File | null
  title?: string
  from?: string | Date | number
  until?: string | Date | number
  description?: string
  policies?: string
  dynamic?: boolean
  membership?: string | boolean
  informationApi?: PromoApi[]
}

export interface IPropsPromoService {
  service: PromoService
  indexServ: number
  indexApi: number
  errors: FormikErrors<PromoAdmin>
}

export interface IPropsFieldArray extends IPropsPromoService {
  helper: FieldArrayRenderProps
  errors: FormikErrors<PromoAdmin>
}

export type TFlagModal = 'add' | 'cancel' | 'edit' | 'delete'
export interface PromoModal {
  open: boolean
  index?: number
  flag?: TFlagModal
  data?: PromoHotel
}
