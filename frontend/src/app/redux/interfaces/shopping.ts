import { IBill, ShoppingCart } from '@modules/shopping/interface'

export interface ShoppingState {
  bill?: IBill
  shopping?: ShoppingCart[]
  total?: number
  tax?: number
  hash_assistant?: boolean
  aux?: IBill | ShoppingCart | string | number | ShoppingCart[] | any
}

export interface ShoppingAction {
  type: string
  payload?: ShoppingState
}
