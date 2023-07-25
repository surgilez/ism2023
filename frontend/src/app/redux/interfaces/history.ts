import { IHistory } from '@modules/client/interface'

export interface HistoryState {
  list?: IHistory[]
  aux?: IHistory | IHistory[]
}

export interface HistoryAction {
  type: string
  payload?: HistoryState
}
