export interface MarkState {
  state: string
}

export interface MarkAction {
  type: string
  payload?: MarkState
}
