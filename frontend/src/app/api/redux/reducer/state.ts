/* eslint-disable default-case */
/* eslint-disable default-param-last */
import { ServiceState, ServiceAction } from '../interface/state'
import { GET_SERVICES } from '../types'

const init: ServiceState = {
  list: [],
}

export const ServiceReducer = (
  state = init,
  { type, payload }: ServiceAction
) => {
  switch (type) {
    case GET_SERVICES:
      state = { ...state, ...payload }
      break
  }

  return state
}
