import { ChatAction, ChatState } from '@redux/interfaces/chat'
import {
  USERS_SOCKET,
  TYPE_ACTIVE_CHAT,
  ACTIVE_CHAT,
  MESSAGES,
  NEW_MESSAGE,
  USERS_FILTER,
  CONFIRM_CALL,
  CONNECT_USER,
} from '@redux/types'

const init: ChatState = {
  messages: [],
}

export const ChatReducer = (
  state = init,
  { type, payload }: ChatAction
): ChatState => {
  switch (type) {
    case USERS_SOCKET:
      state = { ...state, users: payload?.users }
      break
    case USERS_FILTER:
      state = { ...state, usersFilter: payload?.aux }
      break
    case TYPE_ACTIVE_CHAT:
      state = { ...state, typeActiveChat: payload?.typeActiveChat }
      break
    case ACTIVE_CHAT:
      state = { ...state, activeChat: payload?.activeChat }
      break
    case CONNECT_USER:
      if (payload?.aux) {
        const data = state?.users?.map((user) =>
          payload.aux.id === user.account.id
            ? { ...user, account: payload.aux }
            : user
        )

        state = {
          ...state,
          users: data,
          usersFilter: data,
        }
      }
      break
    case MESSAGES:
      state = {
        ...state,
        messages: payload?.messages,
      }
      break
    case NEW_MESSAGE:
      if (
        (state.activeChat?.account.id === payload?.message?.to ||
          state.activeChat?.account.id === payload?.message?.from) &&
        payload?.message
      ) {
        state = {
          ...state,
          messages: [...(state.messages as any), payload.message],
        }
      }
      break
    case CONFIRM_CALL:
      state = { ...state, call: payload?.call }
      break
    default:
  }

  return state
}

export default ChatReducer
