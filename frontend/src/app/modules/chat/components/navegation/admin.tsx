import {
  activeChatAction,
  setTypeActiveChat,
  setUsersFilterChat,
} from '@redux/actions/chat'
import { typeActiveChat } from '@redux/interfaces/chat'
import { Redux } from '@redux/interfaces/redux'
import { useDispatch, useSelector } from 'react-redux'

export const ChatNavigationAdmin = () => {
  const dispatch = useDispatch()
  const { users, usersFilter, typeActiveChat } = useSelector(
    (i: Redux) => i.chat
  )

  const handleActiveChat = (type: typeActiveChat) => {
    dispatch(setTypeActiveChat(type))
    if (users !== usersFilter) {
      users && dispatch(setUsersFilterChat(users))
    }
    dispatch(activeChatAction(undefined))
  }

  return (
    <>
      <li
        onClick={() => handleActiveChat('seller')}
        className={`btn btn-ghost btn-sm px-7 border-2 border-gray-500 p-2 rounded-2xl ${
          typeActiveChat && typeActiveChat.endsWith('seller') && 'subNavActive'
        }`}
      >
        Vendedores
      </li>
      <li
        onClick={() => handleActiveChat('client')}
        className={`btn btn-ghost btn-sm px-7 border-2 border-gray-500 p-2 rounded-2xl ${
          typeActiveChat && typeActiveChat.endsWith('client') && 'subNavActive'
        }`}
      >
        Clientes
      </li>
    </>
  )
}
