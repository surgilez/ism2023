/* eslint-disable default-param-last */
import {
  AdminProvidersAction,
  AdminProviderState,
} from '@redux/interfaces/admin'
import {
  GET_PROVIDERS,
  ACTIVE_PROVIDER,
  UPDATE_PROVIDER,
  SET_LIST_PROVIDER,
  RESET_PROVIDER_REPORT,
  ADD_NEW_PROVIDER,
} from '@redux/types'

const init: AdminProviderState = {
  list: [],
  active: undefined,
  select: [],
  selectReset: false,
}

export const AdminProvidersReducer = (
  state = init,
  { type, payload }: AdminProvidersAction
) => {
  switch (type) {
    case ADD_NEW_PROVIDER:
      if (state.list) {
        state = { ...state, list: [...state.list, payload?.aux] }
      } else {
        state = { ...state, list: [payload?.aux] }
      }
      break
    case GET_PROVIDERS:
      state = { ...state, list: payload?.list }
      break
    case ACTIVE_PROVIDER:
      state = { ...state, active: payload?.active }
      break
    case UPDATE_PROVIDER:
      if (state.list) {
        state = {
          ...state,
          list: state.list.map((provider) =>
            provider.id === payload?.aux.id ? payload?.aux : provider
          ),
          select: init.select,
          active: init.active,
        }
      }
      break
    case SET_LIST_PROVIDER:
      state = { ...state, select: payload?.select }
      break
    case RESET_PROVIDER_REPORT:
      state = { ...state, selectReset: payload?.aux }
      break
    default:
  }
  return state
}
