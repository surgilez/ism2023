import { ClientState, ClientAction } from '@redux/interfaces/admin/client'
import {
  SET_CLIENTS,
  SET_LIST_CLIENTS,
  SUSPENSE_CLIENTS,
  SET_RESET_CLIENT,
  EDIT_CLIENT,
  SET_ACTIVE_CLIENT,
  ADD_NEW_CLIENT,
  SET_TOTAL_REGISTROS,
} from '@redux/types'

const init: ClientState = {
  list: {
    accounts: [],
    totalResults: 0,
  },
  select: [],
  selectReset: false,
}

export const ClientReducer = (
  state = init,
  { type, payload }: ClientAction
): ClientState => {
  switch (type) {
    case ADD_NEW_CLIENT:
      if (state.list) {
        if (state.list.accounts && state.list?.accounts.length > 0) {
          state = {
            ...state,
            list: {
              ...state.list,
              accounts: [...state.list.accounts, payload?.aux],
            },
          }
        } else {
          state = {
            ...state,
            list: {
              ...state.list,
              accounts: [payload?.aux],
            },
          }
        }
      }
      break
    case SET_CLIENTS:
      state = { ...state, list: payload?.list }
      break
    case SET_TOTAL_REGISTROS:
      if (state.list) {
        state = {
          ...state,
          list: { ...state.list, totalResults: payload?.aux },
        }
      }
      break
    case SET_LIST_CLIENTS:
      state = { ...state, select: payload?.select }
      break
    case SUSPENSE_CLIENTS:
      if (state.list) {
        state = {
          ...state,
          list: {
            ...state.list,
            accounts: state.list?.accounts.map((client) => {
              state.select?.forEach((idSelect) => {
                if (idSelect === client.id) {
                  client.state = payload?.aux
                }
              })
              return client
            }),
          },
          select: [],
          selectReset: true,
        }
      }
      break
    case SET_RESET_CLIENT:
      state = { ...state, selectReset: payload?.aux }
      break
    case EDIT_CLIENT:
      if (state.list) {
        state = {
          ...state,
          list: {
            ...state.list,
            accounts: state.list.accounts.map((client) => {
              if (client.id === payload?.aux.id) {
                client = payload?.aux
              }
              return client
            }),
          },
          select: [],
          selectReset: true,
          clientActive: undefined,
        }
      }
      break
    case SET_ACTIVE_CLIENT:
      if (state.list) {
        if (payload?.aux) {
          state = {
            ...state,
            clientActive: state.list.accounts.find(
              (client) => state.select && client.id === state.select[0]
            ),
          }
        } else {
          state = { ...state, clientActive: undefined }
        }
      }
      break
    default:
  }

  return state
}
