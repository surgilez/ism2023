export interface SellerClientState {
  id: string
  email: string
  commission: number
  name: string
  lastName: string
}

export interface SellerClientAction {
  type: string
  payload: SellerClientState
}
