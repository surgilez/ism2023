import { combineReducers } from '@reduxjs/toolkit'
import { HotelReducer } from './hotel'
import { MulticompleteReducer } from './multicomplete'
import { RegionReducer } from './region'
import { UtilsReducer } from './utils'

export const RateHackReducers = combineReducers({
  multicomplete: MulticompleteReducer,
  region: RegionReducer,
  hotel: HotelReducer,
  util: UtilsReducer,
})
