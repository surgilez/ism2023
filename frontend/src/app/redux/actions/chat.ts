// import { Fetching } from '@helpers/fetch'
import { FetchingToken } from '@helpers/fetch'
import { scrollToBottomAnimatedChat } from '@helpers/scroll'
import {
  Message,
  typeActiveChat,
  ChatAction,
  UserChat,
  Account,
} from '@redux/interfaces/chat'
import { Redux } from '@redux/interfaces/redux'
import {
  USERS_SOCKET,
  ACTIVE_CHAT,
  TYPE_ACTIVE_CHAT,
  MESSAGES,
  NEW_MESSAGE,
  USERS_FILTER,
  CONFIRM_CALL,
  CONNECT_USER,
} from '@redux/types'
import { trackPromise } from 'react-promise-tracker'
import Swal from 'sweetalert2'

export const getUsersChat = (users: UserChat[]): ChatAction => ({
  type: USERS_SOCKET,
  payload: {
    users,
  },
})

export const setUsersFilterChat = (users: UserChat[]): ChatAction => ({
  type: USERS_FILTER,
  payload: {
    aux: users,
  },
})

export const connectUser = (account: Account): ChatAction => ({
  type: CONNECT_USER,
  payload: {
    aux: account,
  },
})

export const setTypeActiveChat = (chat: typeActiveChat): ChatAction => ({
  type: TYPE_ACTIVE_CHAT,
  payload: {
    typeActiveChat: chat,
  },
})

export const activeChatAction = (user: UserChat | undefined): ChatAction => ({
  type: ACTIVE_CHAT,
  payload: {
    activeChat: user,
  },
})

export const startActiveChat =
  (user: UserChat) => (dispatch: (val?: ChatAction) => void) => {
    dispatch(activeChatAction(user))
  }

export const getMessages = (messages: Message[]): ChatAction => ({
  type: MESSAGES,
  payload: {
    messages,
  },
})

export const sendMessage = (message: Message): ChatAction => ({
  type: NEW_MESSAGE,
  payload: {
    message,
  },
})

export const confirmCall = (call?: boolean): ChatAction => ({
  type: CONFIRM_CALL,
  payload: { call },
})

export const startGetMessages =
  () => async (dispatch: (val?: ChatAction) => void, redux: () => Redux) => {
    const { activeChat } = redux().chat
    if (!activeChat) return

    const {
      status,
      data: { messages },
    } = await trackPromise(
      FetchingToken({
        method: 'get',
        url: `/chat/messages/${activeChat.account.id}`,
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
      }).catch(({ response: { data } }) => {
        Swal.fire({
          icon: 'error',
          title: 'Error iniciando la sesión',
          text: data.err.msg,
        })
      }),
      'loadMessage'
    )

    if (status === 200 && messages) {
      const messageMapped = messages.map((message: any) => ({
        ...message,
        from: message.fromId,
        to: message.toId,
      }))
      dispatch(getMessages(messageMapped))
      setTimeout(() => {
        scrollToBottomAnimatedChat('messages')
      }, 100)
    } else {
      dispatch(getMessages([]))
    }
  }

export const startGetAllUsers =
  () => async (dispatch: (val?: any) => void, redux: () => Redux) => {
    const { rol } = redux().user
    const {
      status,
      data: { account },
    } = await trackPromise(
      FetchingToken({
        method: 'get',
        url: `/accounts`,
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
      }).catch(({ response: { data } }) => {
        Swal.fire({
          icon: 'error',
          title: 'Error iniciando la sesión',
          text: data.err.msg,
        })
      }),
      'getMessages'
    )

    if (status === 200 && account) {
      const users = account.filter((user: any) => {
        if (rol === 'client') {
          return user.rol.name !== 'client'
        } else {
          return user
        }
      })

      dispatch(getUsersChat(users))
      dispatch(setUsersFilterChat(users))
    }
  }
