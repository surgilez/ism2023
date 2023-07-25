/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { startActiveChat, startGetMessages } from '@redux/actions/chat'
import { Redux } from '@redux/interfaces/redux'
import { NameChat } from '@utils/pipes'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from '@utils/components/avatar'
import { UserChat } from '@redux/interfaces/chat'

export const ListUsersChat = () => {
  const {
    auth: { uid },
    chat: { usersFilter, typeActiveChat },
    user: { rol },
  } = useSelector((i: Redux) => i)

  const dispatch = useDispatch()

  const handleActiveChat = (user: UserChat) => {
    dispatch(startActiveChat(user))
    dispatch(startGetMessages())
  }

  return (
    <div
      className={`pl-2 my-2 flex xl:flex-col ${
        rol !== 'admin' ? 'text-white' : 'text-black'
      }`}
    >
      {usersFilter?.map((user: any, i) => {
        if (uid === user.account.id) return null
        if (
          user.rol.name === typeActiveChat ||
          (typeActiveChat === 'team' && user.rol.name === 'admin') ||
          rol === 'client'
        )
          return (
            <div
              key={i}
              className="flex flex-col xl:flex-row xl:my-3 items-center gap-5 mr-7 w-fit cursor-pointer mt-2 "
              onClick={() => handleActiveChat(user)}
            >
              <Avatar
                online={user.account.online}
                img={user.person.img}
                isChat
              />
              <span className="text-lg whitespace-nowrap">
                {NameChat(user.person.name, user.person.lastName)}
              </span>
            </div>
          )
      })}
    </div>
  )
}
