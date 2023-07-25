export type TtypePag = 'sellers' | 'clients'

export interface UtilsState {
  page?: number
  typePag?: TtypePag
}

export interface UtilsAction {
  type: string
  payload?: UtilsState
}
