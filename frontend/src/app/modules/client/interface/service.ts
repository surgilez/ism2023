import { ShoppingCart } from '@modules/shopping/interface'

export type TService =
  | 'Hoteles'
  | 'Vuelos'
  | 'Tours'
  | 'Autos'
  | 'Crucero'
  | 'Seguro'
  | 'Traslados'

export interface ISearchService {
  service: TService
}

export type IHistory = ShoppingCart
