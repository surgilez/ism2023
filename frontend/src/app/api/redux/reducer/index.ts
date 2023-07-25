import { combineReducers } from '@reduxjs/toolkit'
import { RateHackReducers } from '@api/ratehawk/redux/reducer'
import { ServiceReducer } from './state'
import { MarkReducer } from './mark'

export const ApiHackReducers = combineReducers({
  ratehawk: RateHackReducers,
  services: ServiceReducer,
  mark: MarkReducer,
})
